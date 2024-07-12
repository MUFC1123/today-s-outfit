import React from 'react';

interface Item {
  name: string;
  color: string;
}

interface Outfit {
  top: Item;
  bottom: Item;
  shoes: Item;
  accessories: number;
}

interface FavoriteOutfitsProps {
  favorites: Outfit[];
  removeFavorite: (index: number) => void;
}

const FavoriteOutfits: React.FC<FavoriteOutfitsProps> = ({ favorites, removeFavorite }) => {
  return (
    <div>
      <h2>My favorites</h2>
      {favorites.length === 0 ? (
        <p>get your list</p>
      ) : (
        <ul>
          {favorites.map((outfit, index) => (
            <li key={index}>
              <p style={{ color: outfit.top.color }}>Tops: {outfit.top.name}</p>
              <p style={{ color: outfit.bottom.color }}>Bottoms: {outfit.bottom.name}</p>
              <p style={{ color: outfit.shoes.color }}>Shoes: {outfit.shoes.name}</p>
              <p>Accessories: {outfit.accessories}</p>
              <button onClick={() => removeFavorite(index)}>delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteOutfits;
