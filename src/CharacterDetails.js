import React, { useState, useEffect } from "react";
import "./CharacterDetails.css";

const CharacterDetails = ({ character, onBackToGrid }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        // Fetch episode names using character's episode URLs
        const episodePromises = character.episode.map(async (episodeURL) => {
          const episodeResponse = await fetch(episodeURL);
          const episodeData = await episodeResponse.json();
          return episodeData.name;
        });

        // Wait for all episode requests to complete
        const episodeNames = await Promise.all(episodePromises);
        setEpisodes(episodeNames);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [character.episode]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profileDetails">
      <div className="profileHead">
        <h2 className="profileheading">{character.name}'s Profile</h2>
        <button className="viewprofile goBack" onClick={onBackToGrid}>
          Back to Grid
        </button>
      </div>

      <div className="content">
        <img
          className="profileimg"
          src={character.image}
          alt={character.name}
        />

        <div className="details">
          <div className="charinfo">
            <h3>Character Information</h3>
            <p>Name: {character.name}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
            {/* Add other character details as needed */}
          </div>

          <div>
            <h3>Origin and Current Location</h3>
            <p>
              Origin: {character.origin.name} (Dimension:{" "}
              {character.origin.dimension})
            </p>
            <p>Current Location: {character.location.name}</p>
          </div>
        </div>
        <div className="episodeSec">
          <h3>Episodes</h3>
          <ul>
            {episodes.map((episode, index) => (
              <li key={index}>{episode}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
