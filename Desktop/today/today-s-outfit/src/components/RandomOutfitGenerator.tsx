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
  { name: 'T-shirts', color: '' },
  { name: 'shirts', color: '' }
];
const bottoms = [
  { name: 'denim', color: '' },
  { name: 'slacks', color: '' },
  { name: 'work', color: '' }
];
const shoes = [
  { name: 'sneaker', color: '' },
  { name: 'leather', color: '' }
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

  const randomizeSpecificTop = (itemName: string) => {
    const specificTop = tops.find(top => top.name === itemName);
    if (specificTop) {
      setOutfit({ ...outfit, top: { ...specificTop, color: getRandomColor() } });
    }
  };

  const randomizeBottom = () => {
    setOutfit({ ...outfit, bottom: getRandomItem(bottoms) });
  };

  const randomizeSpecificBottom = (itemName: string) => {
    const specificBottom = bottoms.find(bottom => bottom.name === itemName);
    if (specificBottom) {
      setOutfit({ ...outfit, bottom: { ...specificBottom, color: getRandomColor() } });
    }
  };

  const randomizeShoes = () => {
    setOutfit({ ...outfit, shoes: getRandomItem(shoes) });
  };

  const randomizeSpecificShoes = (itemName: string) => {
    const specificShoes = shoes.find(shoe => shoe.name === itemName);
    if (specificShoes) {
      setOutfit({ ...outfit, shoes: { ...specificShoes, color: getRandomColor() } });
    }
  };

  const randomizeAccessories = () => {
    setOutfit({ ...outfit, accessories: getRandomNumber() });
  };

  return (
    <div className="generator-container">
      <h1 className="title">Today's outfit</h1>
      <div>
        <div className="item-container">
          <select onChange={(e) => randomizeSpecificTop(e.target.value)} value={outfit.top.name}>
            <option value="T-shirts">T-shirts</option>
            <option value="shirts">Shirts</option>
          </select>
          <div className="bar" style={{ backgroundColor: outfit.top.color }}></div>
          <button className="button" onClick={randomizeTop}>Push</button>
        </div>
        <div className="item-container">
          <select onChange={(e) => randomizeSpecificBottom(e.target.value)} value={outfit.bottom.name}>
            <option value="denim">Denim</option>
            <option value="slacks">Slacks</option>
            <option value="work">Work</option>
          </select>
          <div className="bar" style={{ backgroundColor: outfit.bottom.color }}></div>
          <button className="button" onClick={randomizeBottom}>Push</button>
        </div>
        <div className="item-container">
          <select onChange={(e) => randomizeSpecificShoes(e.target.value)} value={outfit.shoes.name}>
            <option value="sneaker">Sneaker</option>
            <option value="leather">Leather</option>
          </select>
          <div className="bar" style={{ backgroundColor: outfit.shoes.color }}></div>
          <button className="button" onClick={randomizeShoes}>Push</button>
        </div>
        <div className="item-container">
          <p>Accessories: {outfit.accessories}</p>
          <button className="button" onClick={randomizeAccessories}>Push</button>
        </div>
        <div className="item-container">
          <button className="button" onClick={generateRandomOutfit}>Generate Random Outfit</button>
          <button className="button fav" onClick={addToFavorites}>Add to Favorite</button>
        </div>
      </div>
    </div>
  );
};

export default RandomOutfitGenerator;

