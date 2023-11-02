console.log("api calls");
(async function main() {
    const Poke = new Pokedex.Pokedex();
    const snorlax = await Poke.getPokemonByName("snorlax");
    window.snorlax = snorlax;
    console.log(`Snorlax HP: ${snorlax.stats.find(stat => stat.stat.name == "hp").base_stat}`);
})();

class Pokemon {
    constructor(object) {
        this.stats = {};
        object.stats.forEach(stat => {
            this.stats[stat.stat.name] = {
                base: stat.base_stat,
                ev: null,
                iv: null
            };
        });
        this.level = 0;
    }

    getStat(name) {
        const s = this.stats[name];
        const fl = (num, denom = 1) => Math.floor(num / denom);
        return fl(fl((2 * s.base + s.iv + fl(s.ev, 4), 100 / this.level) + 5) * this.nature);
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