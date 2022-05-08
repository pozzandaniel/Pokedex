
async function loadPokemons() {
    for (let i = 1; i < 26; i++) {
        
        let pokemon = i;
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(url);
        let responseAsJSON = await response.json();
        renderPokemons(responseAsJSON, i);
    }
    renderPokemonButton();
    

}

function renderPokemons(responseAsJSON, i){
    let pokemonContainer = document.getElementById('pokemonContainer');
    let name = responseAsJSON['forms'][0]['name'];
    let image = responseAsJSON['sprites']['other']['dream_world']['front_default'];
    let type = responseAsJSON['types'][0]['type']['name'];
    pokemonContainer.innerHTML += `
    <div onclick = "showCardAnimation(${i})" id = "pokemon-${i}" class="pokemon-card">
        <div class = pokemon-heading>
            <h2 class = "text_matt_background text-flex width-90 no-margin-top-bottom text-capitalize">${name}<span class="text-white-little">#${i}</span></h2>
            <img class = "pokemon-img" src="${image}">
            <h3 class = "text_matt_background no-margin-top-bottom text-capitalize">${type}</h3>
        </div>
    </div>
    `;
    colorPokemonTypology(type, i);
  
}

function colorPokemonTypology(type, i) {
    if(type == 'grass') {
        document.getElementById(`pokemon-${i}`).classList.add('grass');
    }
    if(type == 'fire') {
        document.getElementById(`pokemon-${i}`).classList.add('fire');
    }
    if(type == 'water') {
        document.getElementById(`pokemon-${i}`).classList.add('water');
    }
    if(type == 'bug') {
        document.getElementById(`pokemon-${i}`).classList.add('bug');
    }
    if (type == 'poison') {
        document.getElementById(`pokemon-${i}`).classList.add('poison');
    }
    if (type == 'electric') {
        document.getElementById(`pokemon-${i}`).classList.add('electric');
    }

}


function renderPokemonButton() {
    let headContainer = document.getElementById('headContainer');
    headContainer.innerHTML += `
    <button class="pokemon-button">Neue Pokemon laden</button>
    `;
}

function showCardAnimation(i){
    document.getElementById('dialogContainer').classList.remove('d-none');
    let pokemonTile = document.getElementById('pokemonTile');
    pokemonTile.style = 'background-color: transparent;';
    pokemonTile.innerHTML += `
    <img id="pokeballImg" class= "pokemonball-img" src="./img/pokemon_ball.png">
    `; 
    setTimeout(showCard, 1000, i);
}

async function showCard(i) {
    await loadCard(i);  
    let name = responseAsJSON['forms'][0]['name'];
    let image = responseAsJSON['sprites']['other']['dream_world']['front_default'];
    let type = responseAsJSON['types'][0]['type']['name'];
    let pokemonTile = document.getElementById('pokemonTile');
    document.getElementById('pokemonHead').innerHTML = fillTopCard(i, name, image, type);
    colorTopCard(type);
    document.getElementById('body').classList.add('stop-scrolling');
    document.getElementById('pokeballImg').classList.add('d-none');
    
}




function fillTopCard(i, name, image, type) {
    let heartIcon = checkFavourite(name);
    return `
    <h2 class = "text_matt_background text-flex width-100 no-margin-top-bottom">
    <span><img onclick="closeCard()" class="back-icon" src="./img/reply-solid.svg"></span>
    <span class="text-capitalize">${name}</span>
    <span class="text-white-little"># ${i}</span>
    </h2>
    <img class="pokemon-img" src="${image}"> 
    <h2 class="text-capitalize text-flex width-100">
    <span>${type}<span>
    <span><img id="heartIcon" onclick="addFavoritePokemon(${i})" class="back-icon" src="${heartIcon}"></span>
    </h2>
    `;
}

let favoritePokemons = {
    'names': [],
    'status': []
}


function checkFavourite(name) {
    let indexName = favoritePokemons['names'].indexOf(name);
    console.log(indexName);
    if(indexName == -1){
        return heartIcon = './img/heart-regular.svg';
    } else {
        return heartIcon = './img/heart-solid.svg';
    }
}
    
    
    
function colorTopCard(type){
    if(type == 'grass') {
        document.getElementById(`pokemonHead`).classList.add('grass');
    }
    if(type == 'fire') {
        document.getElementById(`pokemonHead`).classList.add('fire');
    }
    if(type == 'water') {
        document.getElementById(`pokemonHead`).classList.add('water');
    }
    if(type == 'bug') {
        document.getElementById(`pokemonHead`).classList.add('bug');
    }
    if (type == 'poison') {
        document.getElementById(`pokemonHead`).classList.add('poison');
    }
    if (type == 'electric') {
        document.getElementById(`pokemonHead`).classList.add('electric');
    }
}


function closeCard() {
    document.getElementById('dialogContainer').classList.add('d-none');
    document.getElementById('body').classList.remove('stop-scrolling');
    document.getElementById('pokemonTile').innerHTML = `
    <div id="pokemonHead"></div>
    `;
    document.getElementById('pokeballImg').classList.remove('d-none');
    
    
}

function doNotCloseCard(event) {
    event.stopPropagation();
}

async function loadCard(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    return responseAsJSON = await response.json();
    
}




function addFavoritePokemon(i){
    let name = responseAsJSON['forms'][0]['name'];
    let indexName = favoritePokemons['names'].indexOf(name);
    if (indexName == -1){
        favoritePokemons['names'].push(name);
        favoritePokemons['status'].push(1); 
        colorHeart(); 
    } else {
        favoritePokemons['names'].splice(indexName, 1);
        favoritePokemons['status'].splice(indexName, 1);
        uncolorHeart();
    }
}

function colorHeart(){
    let heartIcon = document.getElementById('heartIcon');
    heartIcon.src = './img/heart-solid.svg';
}
function uncolorHeart(){
    let heartIcon = document.getElementById('heartIcon');
    heartIcon.src = './img/heart-regular.svg';
}


// function fillCardPokemon(object){
    //     let name = object['forms'][0]['name'];
//     let pokemonHeading = document.getElementById('pokemonHeading');
//     let imgPokemon = object['sprites']['other']['dream_world']['front_default'];
//     let pokemonType = object['types'][0]['type']['name'];
//     pokemonHeading.innerHTML += `<h2>${name}</h2> 
//     <img src="${imgPokemon}">
//     `;
//     pokemonHeading.innerHTML += `<h3>${pokemonType}</h3>`;    
// }

function fillAttributesPokemon(object) {
    let pokemonOutline = document.getElementById('pokemonOutline');
    let stats = object['stats'];
    for(let i = 0; i < stats.length; i++){
        let attributeName = object['stats'][i]['stat']['name'];
        let attributeValue = object['stats'][i]['base_stat'];
        pokemonOutline.innerHTML += `<h3>${attributeName} : ${attributeValue}</h3> `;

    }
}