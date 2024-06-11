const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonimage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let contadora;

//receber respostas da api
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = "carregando:";
    pokemonimage.src = "https://i.pinimg.com/originals/8a/c1/29/8ac12962c05648c55ca85771f4a69b2d.gif";
    const data = await fetchPokemon(pokemon);

    if (data) {

        pokemonNumber.textContent = data.id;
        pokemonName.textContent = data.name;
        pokemonimage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        input.value = "";
        contadora = data.id;
        console.log(data);
    } else {
        pokemonName.textContent = "não encontrado:(";
        pokemonNumber.textContent = "";
        pokemonimage.src = "";
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    if (contadora > 1) {
        contadora -= 1;
        renderPokemon(contadora);
    }
});


buttonNext.addEventListener("click", () => {

    contadora += 1;
    renderPokemon(contadora);
});


renderPokemon(1);