console.log("api calls");
(async function main() {
    const Poke = new Pokedex.Pokedex();
    const snorlax = await Poke.getPokemonByName("snorlax");
    window.snorlax = snorlax;
    console.log(`Snorlax HP: ${snorlax.stats.find(stat => stat.stat.name == "hp").base_stat }`);
})();