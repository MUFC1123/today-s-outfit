// import React from "react";
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';
import RandomOutfitGenerator from './components/RandomOutfitGenerator';
import Navigate from "./components/Navigate";
// import FavoriteOutfits from './components/FavoriteOutfits';
import './App.css';

const App: React.FC = () => {
  console.log('App component rendered');

  return (
    <Router>
      <Navigate />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/random-outfit-generator" element={<RandomOutfitGenerator />} />
          {/* <Route path="/favorite-outfits" element={<FavoriteOutfits />} /> */}
        </Routes>
    </Router>
  );
};

export default App;

