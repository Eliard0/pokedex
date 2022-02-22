const fecthPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    console.log(getPokemonUrl)

    const pokemonPromises = []

    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
        // console.log(response)
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((string, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                string += `
                    <li class="card ${types[0]}">
                        <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class=" card-subtitle">${types.join(' | ')}</p>
                    </li>
                `
                return string
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisPokemons
        })
}
fecthPokemon()