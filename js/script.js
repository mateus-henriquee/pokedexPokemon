const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '?';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        inputSearch.value = ''    
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = '';
    }
}

let searchPokemon = 9

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase())
    inputSearch.value = ''
})

buttonPrev.addEventListener('click', (event) => {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
})

buttonNext.addEventListener('click', (event) => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(9)
