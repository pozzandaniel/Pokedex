
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
    fillBottomCard(i);
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

function fillBottomCard(i){
    let stats = responseAsJSON['stats'];
    let pokemonAttributes = document.getElementById('pokemonAttributes');
    for(let i = 0; i < stats.length; i++){
        let attributeName = responseAsJSON['stats'][i]['stat']['name'];
        let attributeValue = responseAsJSON['stats'][i]['base_stat'];
        pokemonAttributes.innerHTML += `
        <p class="attribute-name">${attributeName} :</p>
        <div class="progress">
         <div id="progressBar-${i}" class="progress-bar" role="progressbar" style="width: ${attributeValue}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${attributeValue}</div>
        </div>
        `;
        changeColorProgressBar(i, attributeValue);
    }  
}

function changeColorProgressBar(i, attributeValue) {
    if(attributeValue <= 36){
        document.getElementById('progressBar-'+ i).style = `background-color: red; width: ${attributeValue}%;`;
    }
    if(attributeValue <= 69 && attributeValue >= 37){
        document.getElementById('progressBar-'+ i).style = `background-color: orange; width: ${attributeValue}%;`;
    }
    if(attributeValue >= 70){
        document.getElementById('progressBar-'+ i).style = `background-color: green; width: ${attributeValue}%;`;
    }
    
}

function closeCard() {
    document.getElementById('dialogContainer').classList.add('d-none');
    document.getElementById('body').classList.remove('stop-scrolling');
    document.getElementById('pokemonTile').innerHTML = `
    <div class="pokemonTile-child" id="pokemonHead"></div>
    <div class="pokemonTile-child" id="pokemonAttributes"></div>
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


