import { Route, Routes } from "react-router-dom";
import Pokedex from "../componentes/Pokedex/Pokedex";
import PokemonDetails from "../componentes/PokemonDetails/PokemonDetails";
function CustomRoute() {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    )
}
export default CustomRoute;