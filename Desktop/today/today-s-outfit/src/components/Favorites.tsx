// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import FavoriteOutfits from './FavoriteOutfits';

// interface Item {
//   name: string;
//   color: string;
// }

// interface Outfit {
//   top: Item;
//   bottom: Item;
//   shoes: Item;
//   accessories: number;
// }

// const Favorites: React.FC = () => {
//   const [favorites, setFavorites] = useState<Outfit[]>([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const querySnapshot = await getDocs(collection(db, 'favorites'));
//       const fetchedFavorites: Outfit[] = [];
//       querySnapshot.forEach((doc) => {
//         fetchedFavorites.push(doc.data() as Outfit);
//       });
//       setFavorites(fetchedFavorites);
//     };

//     fetchFavorites();
//   }, []);

//   const removeFavorite = async (index: number) => {
//     const favoriteToRemove = favorites[index];
//     const favoriteDoc = (await getDocs(collection(db, 'favorites'))).docs.find(doc => {
//       const data = doc.data() as Outfit;
//       return (
//         data.top.name === favoriteToRemove.top.name &&
//         data.bottom.name === favoriteToRemove.bottom.name &&
//         data.shoes.name === favoriteToRemove.shoes.name &&
//         data.accessories === favoriteToRemove.accessories
//       );
//     });

//     if (favoriteDoc) {
//       await deleteDoc(doc(db, 'favorites', favoriteDoc.id));
//     }
//     const newFavorites = favorites.filter((_, i) => i !== index);
//     setFavorites(newFavorites);
//   };

//   return (
//     <div>
//       {/* <h1>お気に入りのコーディネート</h1> */}
//       <FavoriteOutfits favorites={favorites} removeFavorite={removeFavorite} />
//     </div>
//   );
// };

// export default Favorites;

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import FavoriteOutfits from './FavoriteOutfits';
import './Favorites.css';

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

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Outfit[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const fetchedFavorites: Outfit[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        fetchedFavorites.push(doc.data() as Outfit);
      });
      setFavorites(fetchedFavorites);
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (index: number) => {
    const favoriteToRemove = favorites[index];
    const favoriteDoc = (await getDocs(collection(db, 'favorites'))).docs.find((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data() as Outfit;
      return (
        data.top.name === favoriteToRemove.top.name &&
        data.bottom.name === favoriteToRemove.bottom.name &&
        data.shoes.name === favoriteToRemove.shoes.name &&
        data.accessories === favoriteToRemove.accessories
      );
    });

    if (favoriteDoc) {
      await deleteDoc(doc(db, 'favorites', favoriteDoc.id));
    }
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
  };

  return (
    <div className="favorites-container">
      {/* <h1>お気に入りのコーディネート</h1> */}
      <FavoriteOutfits favorites={favorites} removeFavorite={removeFavorite} />
    </div>
  );
};

export default Favorites;
