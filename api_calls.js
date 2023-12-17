console.log("api calls");
(async function main() {
    const Poke = new Pokedex.Pokedex();
    const snorlax = await Poke.getPokemonByName("snorlax");
    window.snorlax = snorlax;
    console.log(`Snorlax HP: ${snorlax.stats.find(stat => stat.stat.name === "hp").base_stat}`);
})();

const propHandler = {
    get(_, name){
        return object => object[name];
    }
};
const $prop = new Proxy({}, propHandler);

class Pokemon {
    constructor(raw) {
        this.stats = {};
        raw.stats.forEach(stat => {
            this.stats[stat.stat.name] = {
                base: stat.base_stat,
                ev: 0,
                iv: 0
            };
        });
        this.level = 50;
        this.name = raw.name[0].toUpperCase() + raw.name.substring(1);
        this.id = raw.id;
        this.abilities = raw.abilities.map($prop.ability);
        this.items = raw.held_items.map($prop.item);
        this.gender = "Genderless";
        this.rawMoves = raw.moves || [];
        this.nature = 1;
    }

    async getMoveset(){
        this.moves = new Array(4).fill("Empty");
        this.moveset = new Array(10);
        for(const [i, rawSummary] of this.rawMoves.entries()){
            if(i >= this.moveset.length) break;
            const rawMove = await PokeAPI.getMoveByName(rawSummary.move.name);
            this.moveset[i] = {
                name: rawMove.name,
                type: rawMove.type.name,
                basePower: rawMove.power,
                category: rawMove.meta.category.name,
                description: rawMove.flavor_text_entries[0].flavor_text.replace(/\n/gm, " ")
            };
        }
    }

    getStat(name) {
        const s = this.stats[name];
        const fl = (num, denom) => Math.floor(num / (denom || 1));
        return fl((fl(2 * s.base + s.iv + fl(s.ev, 4), 100 / this.level) + 5) * this.nature);
    }

    setEV(name, val) {
        this.stats[name].ev = val;
    }

    getEV(name) {
        return this.stats[name].ev;
    }

    setIV(name, val) {
        this.stats[name].iv = val;
    }

    getIV(name) {
        return this.stats[name].iv;
    }
}