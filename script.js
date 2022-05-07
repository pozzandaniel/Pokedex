
async function loadPokemon() {
    for (let i = 1; i < 24; i++) {
        
        let pokemon = i;
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(url);
        let responseAsJSON = await response.json();
        renderPokemons(responseAsJSON, i);
    }

}

function renderPokemons(responseAsJSON, i){
    let pokemonContainer = document.getElementById('pokemonContainer');
    let name = responseAsJSON['forms'][0]['name'];
    let image = responseAsJSON['sprites']['other']['dream_world']['front_default'];
    let type = responseAsJSON['types'][0]['type']['name'];
    pokemonContainer.innerHTML += `
    <div id = "pokemon-${i}" class = pokemon-card>
        <div class = pokemon-heading>
            <h2>${name}</h2>
            <img class = "pokemon-img" src="${image}">
            <h3>${type}</h3>
        </div>
    </div>
    `;
    colorPokemonTypology(type, i);
}

function colorPokemonTypology(type, i) {
    if(type == 'grass') {
        document.getElementById(`pokemon-${i}`).classList.add('grass');
    }
}


function fillCardPokemon(object){
    let name = object['forms'][0]['name'];
    let pokemonHeading = document.getElementById('pokemonHeading');
    let imgPokemon = object['sprites']['other']['dream_world']['front_default'];
    let pokemonType = object['types'][0]['type']['name'];
    pokemonHeading.innerHTML += `<h2>${name}</h2> 
    <img src="${imgPokemon}">
    `;
    pokemonHeading.innerHTML += `<h3>${pokemonType}</h3>`;    
}

function fillAttributesPokemon(object) {
    let pokemonOutline = document.getElementById('pokemonOutline');
    let stats = object['stats'];
    for(let i = 0; i < stats.length; i++){
        let attributeName = object['stats'][i]['stat']['name'];
        let attributeValue = object['stats'][i]['base_stat'];
        pokemonOutline.innerHTML += `<h3>${attributeName} : ${attributeValue}</h3> `;

    }
}