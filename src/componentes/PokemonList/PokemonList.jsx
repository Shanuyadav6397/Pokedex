import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon.jsx";
function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL); // This downloads list of 20 pokemons

        // we get the array of pokemons from result
        const pokemonResults = response.data.results;
        console.log(response.data);

        // iterating over the array of pokemons, and using their url, to create an array of promises that will download those 20 pokemons
        const pokemonResultsPromis = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promise array to axios.all, which will download all the pokemons in parallel
        const pokemonData = await axios.all(pokemonResultsPromis); // array of 20 pokemons detailed data
        console.log(pokemonData);

        // nom iterating on the data of each pokemon, and extract namen, id, image and types
        const pokemonListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                name: pokemon.name,
                id: pokemon.id,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            };
        });
        console.log(pokemonListResult);
        setPokemonList(pokemonListResult);
        setIsLoading(false);
    }
    useEffect(() => {
        downloadPokemons();
    }, []);
    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading...' :
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                }
            </div>
            <div className="controls">
                <button>Prev</button>
                <button>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;