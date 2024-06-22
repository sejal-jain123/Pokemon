import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>#{pokemon.id.toString().padStart(3, "0")}</p>
    </div>
  );
};

export default PokemonCard;
