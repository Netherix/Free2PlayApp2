import React from 'react';
import './GameCards.css';
import FavoritesButton from './FavoritesButton';
import { addFavoriteGame, removeFavoriteGame } from '../../services/favoriteService';
import { auth } from '../../firebase';

interface Game {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  favorite: boolean;
}

interface GameCardsProps {
  games: Game[];
  setFlashMessage: React.Dispatch<React.SetStateAction<string>>;
  removeGameFromFavorites: (gameId: number) => void; // Added the prop definition
}

const GameCards: React.FC<GameCardsProps> = ({ games, setFlashMessage, removeGameFromFavorites }) => {
  const handleFavorite = async (gameId: number, isFavorite: boolean) => {
    const game = games.find((game) => game.id === gameId);
    if (!game) return;

    // Show flash message based on favorite status
    const gameTitle = game.title;
    if (game.favorite && !isFavorite) {
      setFlashMessage(`${gameTitle} has been removed from favorites.`);
      removeGameFromFavorites(gameId); // Call the removeGameFromFavorites function
    } else if (!game.favorite && isFavorite) {
      setFlashMessage(`${gameTitle} has been added to favorites.`);
    }

    // Update the favorite status
    game.favorite = isFavorite;

    // Get the current user's ID
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;

      // Store or remove the favorite game in the database
      if (isFavorite) {
        try {
          await addFavoriteGame(
            userId,
            gameId.toString(),
            game.title,
            game.short_description,
            game.thumbnail
          );
          console.log(`${gameTitle} added to favorites.`);
        } catch (error) {
          console.log('Error adding game to favorites:', error);
        }
      } else {
        try {
          await removeFavoriteGame(userId, gameId.toString());
          console.log(`${gameTitle} removed from favorites.`);
        } catch (error) {
          console.log('Error removing game from favorites:', error);
        }
      }
    }
  };

  return (
    <div className="game-cards-container">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.thumbnail} alt={game.title} className="game-image" />
          <div className="card-content">
            <h2 style={{ fontSize: '20px' }}>{game.title}</h2>
            <div className="favorites-button">
              <FavoritesButton
                isFavorite={game.favorite}
                onToggle={() => handleFavorite(game.id, !game.favorite)}
              />
            </div>
            <p>{game.short_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameCards;