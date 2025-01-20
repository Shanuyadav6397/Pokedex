import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon.jsx";
function PokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    });
    async function downloadPokemons() {
        setPokemonListState((state) => ({ ...state, isLoading: true }));
        const response = await axios.get(pokemonListState.pokedexUrl); // This downloads list of 20 pokemons

        // we get the array of pokemons from result
        const pokemonResults = response.data.results;
        console.log(response.data);
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));

        // iterating over the array of pokemons, and using their url, to create an array of promises that will download those 20 pokemons
        const pokemonResultsPromis = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promise array to axios.all, which will download all the pokemons in parallel
        const pokemonData = await axios.all(pokemonResultsPromis); // array of 20 pokemons detailed data

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
        setPokemonListState((state) => ({
            ...state,
            pokemonList: pokemonListResult,
            isLoading: false
        }));
        //setIsLoading(false);
    }
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);
    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? 'Loading...' :
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl === null} onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.prevUrl })}>Previous</button>
                <button disabled={pokemonListState.nextUrl === null} onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.nextUrl })}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;