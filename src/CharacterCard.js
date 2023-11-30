

import React from 'react';
import "./CharacterCard.css"

const CharacterCard = ({ character, onSelect }) => {
  return (
    <div className='card shadow'
      
    >
      <img
        src={character.image}
        alt={character.name}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      
      <button className='viewprofile' onClick={onSelect}>View Profile</button>
    </div>
  );
};

export default CharacterCard;
