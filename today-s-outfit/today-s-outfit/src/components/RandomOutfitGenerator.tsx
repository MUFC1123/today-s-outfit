import React, { useState, useEffect } from 'react';
import './RandomOutfitGenerator.css';
import { db } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

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

const tops = [
  { name: 'Tシャツ', color: '' },
  { name: 'シャツ', color: '' }
];
const bottoms = [
  { name: 'デニム', color: '' },
  { name: 'スラックス', color: '' },
  { name: 'チノパン', color: '' }
];
const shoes = [
  { name: 'スニーカー', color: '' },
  { name: '革靴', color: '' }
];

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomItem = (items: Item[]): Item => {
  const item = items[Math.floor(Math.random() * items.length)];
  return { ...item, color: getRandomColor() };
};

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

const getInitialOutfit = (): Outfit => {
  return {
    top: getRandomItem(tops),
    bottom: getRandomItem(bottoms),
    shoes: getRandomItem(shoes),
    accessories: getRandomNumber(),
  };
};

const RandomOutfitGenerator: React.FC = () => {
  const [outfit, setOutfit] = useState<Outfit>(getInitialOutfit());
  const [favorites, setFavorites] = useState<Outfit[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const fetchedFavorites: Outfit[] = [];
      querySnapshot.forEach((doc) => {
        fetchedFavorites.push(doc.data() as Outfit);
      });
      setFavorites(fetchedFavorites);
    };

    fetchFavorites();
  }, []);

  const generateRandomOutfit = () => {
    const newOutfit = getInitialOutfit();
    setOutfit(newOutfit);
  };

  const addToFavorites = async () => {
    const newFavorites = [...favorites, outfit];
    setFavorites(newFavorites);
    try {
      await addDoc(collection(db, 'favorites'), outfit);
    } catch (error) {
      console.error("Error adding document: ", error);
      setFavorites(favorites);
    }
  };

  const randomizeTop = () => {
    setOutfit({ ...outfit, top: getRandomItem(tops) });
  };

  const randomizeBottom = () => {
    setOutfit({ ...outfit, bottom: getRandomItem(bottoms) });
  };

  const randomizeShoes = () => {
    setOutfit({ ...outfit, shoes: getRandomItem(shoes) });
  };

  const randomizeAccessories = () => {
    setOutfit({ ...outfit, accessories: getRandomNumber() });
  };

  return (
    <div className="container">
      <h1 className="title">Today's outfit</h1>
      <div>
        <button className="button" onClick={generateRandomOutfit}>Push All</button>
        <button className="button" onClick={addToFavorites}>Add to Favorite</button>
      </div>
      <div>
        <div>
          <p style={{ color: outfit.top.color }}>Tops: {outfit.top.name}</p>
          <div style={{ backgroundColor: outfit.top.color, width: '100px', height: '20px' }}></div>
          <button className="button" onClick={randomizeTop}>Push</button>
        </div>
        <div>
          <p style={{ color: outfit.bottom.color }}>Bottoms: {outfit.bottom.name}</p>
          <div style={{ backgroundColor: outfit.bottom.color, width: '100px', height: '20px' }}></div>
          <button className="button" onClick={randomizeBottom}>Push</button>
        </div>
        <div>
          <p style={{ color: outfit.shoes.color }}>Shoes: {outfit.shoes.name}</p>
          <div style={{ backgroundColor: outfit.shoes.color, width: '100px', height: '20px' }}></div>
          <button className="button" onClick={randomizeShoes}>Push</button>
        </div>
        <div>
          <p>Accessories: {outfit.accessories}</p>
          <button className="button" onClick={randomizeAccessories}>Push</button>
        </div>
      </div>
    </div>
  );
};

export default RandomOutfitGenerator;

