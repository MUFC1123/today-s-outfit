// import React from "react";
import { Link } from "react-router-dom";
import "./Navigate.css";

const Navigate = () => {
  return (
    <nav>
      {/* <header>Toiday's outfit</header> */}
      <Link to="/">Home</Link>
      <Link to="/random-outfit-generator">Generator</Link>
      <Link to="/favorites">Fovorite</Link>
    </nav>
  );
};

export default Navigate;