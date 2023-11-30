
import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import "./CharactersGrid.css"

const CharactersGrid = ({ onCharacterSelect }) => {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    episode: "",
    gender: "",
    species: "",
    type: "",
  });

  const fetchCharacters = async (url) => {
    try {
      const response = await axios.get(
        url || "https://rickandmortyapi.com/api/character"
      );
      setCharacters(response.data.results);
      setNextPage(response.data.info.next);
      setPrevPage(response.data.info.prev);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handlePageChange = (url) => {
    fetchCharacters(url);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const filterCharacter = (character) => {
    const isMatch = (field) =>
      !filters[field] ||
      String(character[field]).toLowerCase() ===
        String(filters[field]).toLowerCase();
    return (
      isMatch("status") &&
      isMatch("location") &&
      isMatch("episode") &&
      isMatch("gender") &&
      isMatch("species") &&
      isMatch("type")
    );
  };

  const searchAndFilterCharacters = () => {
    const filteredCharacters = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        filterCharacter(character)
    );
    return filteredCharacters;
  };

  return (
    <div className="main">
      <h1>Rick & Morty Characters</h1>
      <div>
        <input
            className="inputfield"
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <label>Status:</label>
        <select className="inputfield"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <label>Gender:</label>
        <select className="inputfield"
          value={filters.gender}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="unknown">Unknown</option>
        </select>

        <label>Species:</label>
        <select className="inputfield"
          value={filters.species}
          onChange={(e) => handleFilterChange("species", e.target.value)}
        >
          <option value="">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchAndFilterCharacters().map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onSelect={() => onCharacterSelect(character)}
          />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        {prevPage && (
          <button className="nextbtn" onClick={() => handlePageChange(prevPage)}>
            ...Previous Page
          </button>
        )}
        {nextPage && (
          <button className="nextbtn" onClick={() => handlePageChange(nextPage)}>Next Page...</button>
        )}
      </div>
    </div>
  );
};

export default CharactersGrid;
