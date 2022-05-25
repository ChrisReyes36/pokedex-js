const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");

const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
    steel: "#D1D4D4",
    ghost: "#BCA2F0",
    dark: "#97A5B4",
};

const pokeCount = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 898],
};

const initPokemon = async () => {
    for (let i = pokeCount[1][0]; i <= pokeCount[1][1]; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
    // Capitalize first letter of name
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    // Number of pokemon
    const id = pokemon.id.toString().padStart(3, "0");
    // weight of pokemon
    const weight = pokemon.weight;
    // type of pokemon
    const type = pokemon.types[0].type.name;
    // color of pokemon
    const color = colors[type];

    const pokeBox = document.createElement("div");
    pokeBox.classList.add("poke-box");
    pokeBox.style.backgroundColor = color;
    pokeBox.innerHTML = `
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">
        <h4 class="poke-name">${name}</h4>
        <p class="poke-id">#${id}</p>
        <p class="poke-weight">${weight} Kg</p>
        <p class="poke-type">Type: ${type}</p>
    `;
    pokeContainer.appendChild(pokeBox);
};

initPokemon();

searchInput.addEventListener("input", (e) => {
    const pokeNames = document.querySelectorAll(".poke-name");
    const search = searchInput.value.toLowerCase();

    pokeNames.forEach((pokeName) => {
        const nameText = pokeName.textContent.toLowerCase();
        if (nameText.includes(search)) {
            pokeName.parentElement.style.display = "block";
        } else {
            pokeName.parentElement.style.display = "none";
        }
    });
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    searchInput.focus();
});
