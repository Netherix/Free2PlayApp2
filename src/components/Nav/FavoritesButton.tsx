import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';


interface FavoritesButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({ isFavorite, onToggle }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleButtonClick = () => {
    setFavorite(!favorite);
    onToggle();
    if (favorite) {
      console.log('Game name has been removed from favorites');
    } else {
      console.log('Game name has been added to favorites');
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {favorite ? (
          <FontAwesomeIcon icon={faHeart} />
        ) : (
          <FontAwesomeIcon icon={farHeart} />
        )}
      </button>
    </div>
  );
};

export default FavoritesButton;
