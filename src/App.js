import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const promises = response.data.results.map(async (pokemon) => {
          const pokemonRecord = await axios.get(pokemon.url);
          return pokemonRecord.data;
        });
        const results = await Promise.all(promises);
        setPokemonData(results);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchPokemonData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
