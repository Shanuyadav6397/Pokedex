import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    async function PokemonDetails() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setPokemon({
            name: response.data.name,
            id: response.data.id,
            image: response.data.sprites.other.dream_world.front_default,
            types: response.data.types.map((t) => t.type.name),
            abilities: response.data.abilities,
            height: response.data.height,
            weight: response.data.weight,
            stats: response.data.stats
        });
    }

    useEffect(() => {
        PokemonDetails();
    }, []);
    return (
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image} />
            <div className="pokemon-details-name">{pokemon.name}</div>
            <div className="pokemon-details-name">Height: {pokemon.height}</div>
            <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>
        </div>
    )
}
export default PokemonDetails;