
import React, { useState } from 'react';
import CharactersGrid from './CharactersGrid';
import CharacterDetails from './CharacterDetails';

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleBackToGrid = () => {
    setSelectedCharacter(null);
  };
 
  return (
    <div>
      {selectedCharacter ? (
        <CharacterDetails character={selectedCharacter} onBackToGrid={handleBackToGrid} />
      ) : (
        <CharactersGrid onCharacterSelect={handleCharacterSelect} />
      )}
    </div>
  );
};

export default App;
