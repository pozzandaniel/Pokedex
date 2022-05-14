let numberPokemons = 26;
let startCount = 1;
let amountPokemons = 0;

// Pokemons are loaded from API
async function loadPokemons() {
    for (let i = startCount; i < numberPokemons; i++) {
        let pokemon = i; //index of pokemon, it is always increased of 1
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(url); //the information is taken from the url
        let responseAsJSON = await response.json() //the text is converted in an object
        renderPokemons(responseAsJSON, i); //the container with ID pokemonContainer is filled with the pokemon present in the API request
        amountPokemons++; // each loaded pokemon increase this variable of 1. At the beginning this value is 0.
    }

    if (startCount == 1) {
        renderPokemonButton(); //if it is the first time that the page is loaded, a button at the end of the page is shown. It avoids that every time new pokemons are called other buttons are shown under the first.
    }
    
}

function renderPokemons(responseAsJSON, i){
    document.getElementById('headContainer').classList.remove('empty-archive'); // when at least a pokemon in the favorite list is added, the function remove the class that rend an image of an empty list
    let pokemonContainer = document.getElementById('pokemonContainer');
    let name = responseAsJSON['forms'][0]['name']; // that's represent the name of each pokemon present in the API request
    let image = responseAsJSON['sprites']['other']['dream_world']['front_default']; //that's the image of the pokemon
    let type = responseAsJSON['types'][0]['type']['name']; //it represents the type of the pokemon, for example fire, grass, water...
    pokemonContainer.innerHTML +=  templateRenderPokemons(i, name, image, type);
    colorPokemonTypology(type, i); //it gives a color to a pokemon card, it depends from the pokemon typology.
}

function templateRenderPokemons(i, name, image, type){
    return `
    <div onclick = "showCardAnimation(${i})" id = "pokemon-${i}" class="pokemon-card">
        <div class = pokemon-heading>
            <h2 class = "text_matt_background text-flex width-90 no-margin-top-bottom text-capitalize">${name}<span class="text-white-little">#${i}</span></h2>
            <img class = "pokemon-img" src="${image}">
            <h3 class = "text_matt_background no-margin-top-bottom text-capitalize">${type}</h3>
        </div>
    </div>
    `;
}


function colorPokemonTypology(type, i) {
    document.getElementById(`pokemon-${i}`).classList.add(type);
}


function renderPokemonButton() {
    let headContainer = document.getElementById('headContainer');
    headContainer.innerHTML += `
    <button onclick="loadNeuPokemons()" id="pokemonButton" class="pokemon-button">Neue Pokemon laden</button>
    `;
}
// at the beginning only 25 pokemons are loaded, if the button under the pokemon container is clicked, other 26 pokemon are shown
function loadNeuPokemons(){
    startCount = numberPokemons;
    numberPokemons = numberPokemons + 26;
    loadPokemons();
}

// By clicking of a pokemon card, a bigger card is presented. This new card has more information about the selected pokemon.
// By opening the new card an animation with a pokeball starts.

function showCardAnimation(i){
    document.getElementById('dialogContainer').classList.remove('d-none'); // the class with display: none on the full sized dark background container is removed
    let pokemonTile = document.getElementById('pokemonTile');  
    pokemonTile.style = 'background-color: transparent;';   //the box inside the dark container becomes transparent, so only the image with the pokeball is visible
    pokemonTile.innerHTML += `
    <img id="pokeballImg" class= "pokemonball-img" src="./img/pokemon_ball.png">
    `; 
    setTimeout(showCard, 1000, i);  //at the end of the animation with the pokeball, after one second, the card of the pokemon appears
}

async function showCard(i) {
    await loadCard(i);  // the information of the selected pokemon are recovered from the API. The information about the pokemon index "i" come from the renderPokemons(i) and the showCardAnimation(i) functions
    let name = responseAsJSON['forms'][0]['name'];
    let image = responseAsJSON['sprites']['other']['dream_world']['front_default'];
    let type = responseAsJSON['types'][0]['type']['name'];
    document.getElementById('pokemonHead').innerHTML = fillTopCard(i, name, image, type);
    colorTopCard(type);
    fillBottomCard(i);
    document.getElementById('body').classList.add('stop-scrolling'); // when the pokemon card is offen, the scroll property of the website is disabled until the card is closed 
    document.getElementById('pokeballImg').classList.add('d-none');  // the image of the pokeball used in the animation disappears
    
}




function fillTopCard(i, name, image, type) {
    let heartIcon = checkFavourite(name);   //This function check of the pokemon are already selected as favourite.
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

// Status "1" means that the pokemon is in the favourite list. If none the status is "0"

let favoritePokemons = {
    'names': [],
    'status': []
}

// If the pokemon is in the favourite list the index isn't "-1". In that case an image with a full colored heart is shown on the top of the opened card
// if the index is "-1" the pomeon isn't under the favourite and instead a full-colored heart a linear heart appears

function checkFavourite(name) {
    let indexName = favoritePokemons['names'].indexOf(name);
    if(indexName == -1){
        return heartIcon = './img/heart-regular.svg';
    } else {
        return heartIcon = './img/heart-solid.svg';
    }
}
    
   
    
function colorTopCard(type){
    document.getElementById(`pokemonHead`).classList.add(type);
}

// Through this function other informations about the pokemon are shown at the bottom of the card. The progressbar is from bootstrapt.

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

// the progress-bar changes color according to the intensity of the attribute

function changeColorProgressBar(i, attributeValue) {
    if(attributeValue <= 36){
        document.getElementById('progressBar-'+ i).style = `background-color: red; width: ${attributeValue}%;`;
    }
    if(attributeValue <= 69 && attributeValue >= 37){
        document.getElementById('progressBar-'+ i).style = `background-color: orange; width: ${attributeValue}%;`;
    }
    if(attributeValue >= 70 && attributeValue <110){
        document.getElementById('progressBar-'+ i).style = `background-color: green; width: ${attributeValue}%;`;
    }
    if(attributeValue >= 110 && attributeValue < 150){
        document.getElementById('progressBar-'+ i).style = `background-color: silver; width: ${attributeValue}%;`;
    }
    if(attributeValue >= 150){
        document.getElementById('progressBar-'+ i).style = `background-color: blue; width: ${attributeValue}%;`;
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

// This function avoids the closure of the card without intention by clicking the card itself. The closure happens when the user click the dark background of the card, that is the container of this or by clicking the closure taste.

function doNotCloseCard(event) {
    event.stopPropagation();
}

async function loadCard(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    return responseAsJSON = await response.json();
    
}

// By selecting the heart in the Pokemon card. The name of the Pokemon and his new status are pushed in the object favoritePokemons.


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
    // saveArrayInLocalStorage();
}

// function saveArrayInLocalStorage() {
//     let pokemonAsText = JSON.stringify(favoritePokemons);
//     localStorage.setItem('favoritePokemons', pokemonAsText);
// }

function colorHeart(){
    let heartIcon = document.getElementById('heartIcon');
    heartIcon.src = './img/heart-solid.svg';
}
function uncolorHeart(){
    let heartIcon = document.getElementById('heartIcon');
    heartIcon.src = './img/heart-regular.svg';
}

// The typing in the search input is converted in lowercase and searched in the database through the function "name.includes(searchValue)"

function searchPokemon() {
    amountPokemons = 0;
    document.getElementById('pokemonButton').classList.remove('d-none');
    let searchValue = document.getElementById('searchValue').value.toLowerCase();
    document.getElementById('pokemonContainer').innerHTML = '';
    searchPokemonsInAPI(searchValue);
    document.getElementById('pokemonButton').classList.add('d-none');
}

async function searchPokemonsInAPI(searchValue){
    for(let i = 1; i < numberPokemons; i++ ){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJSON = await response.json();
        let name = responseAsJSON['forms'][0]['name'];
        getSearchedPokemon(name, searchValue, responseAsJSON, i);
        
    }
}

function getSearchedPokemon(name, searchValue, responseAsJSON, i){
    if(name.includes(searchValue)){
        renderPokemons(responseAsJSON, i)
        amountPokemons++;
        checkNumbersOfPokemon();
    }
}

// If the number of loaded pokemon are less then 12 the headContainer with the pokemon is 100 vh height to avoid the forming of a white
// space under the container. The same happens when 100 vh height is not removed with more then 12 pokemons

function checkNumbersOfPokemon(){
    if(amountPokemons <= 12){
        document.getElementById('headContainer').classList.add('height-100vh');
    } else {
        document.getElementById('headContainer').classList.remove('height-100vh');
    }
    responseBackgroundImg();

   
}

// This function adjust the responsiveness of the webpages with 461px and 690px depending of the number of card loaded, 
// for the same reason above

let width = [461, 690];

window.onresize = responseBackgroundImg;
responseBackgroundImg();

function responseBackgroundImg(){
    if(window.innerWidth < width[0] || amountPokemons >=12){
        document.getElementById('headContainer').classList.remove('height-100vh');
    } else if(amountPokemons < 12 && window.innerWidth > width[0]) {
        document.getElementById('headContainer').classList.add('height-100vh'); 
    }
    if(amountPokemons < 3){
        document.getElementById('headContainer').classList.add('height-100vh'); 
    }
    if(amountPokemons > 4 && window.innerWidth < width[1]){
        document.getElementById('headContainer').classList.remove('height-100vh');
    }
}







function searchFavourites() {
    amountPokemons = 0;
    document.getElementById('pokemonContainer').innerHTML = '';
    searchFavouritesInAPI();
    document.getElementById('pokemonButton').classList.add('d-none');
    emptyFavourites();
  
}



async function searchFavouritesInAPI(){
    for(let i = 1; i < numberPokemons; i++ ){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJSON = await response.json();
        let name = responseAsJSON['forms'][0]['name'];
        let indexName = favoritePokemons['names'].indexOf(name);
        if(indexName != -1){
            renderPokemons(responseAsJSON, i)
            amountPokemons++;
            checkNumbersOfPokemon();
        } 
    }
}

function emptyFavourites(){
    if(favoritePokemons['names'].length == 0){
        document.getElementById('headContainer').classList.add('empty-archive');
        document.getElementById('pokemonContainer').innerHTML = '<h2 class="text_matt_background text-white-little">Hier ist noch kein Pokemon verfügbar!</h2>';
    }  
}
