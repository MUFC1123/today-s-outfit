import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigate.css";

const Navigate: React.FC = () => {
  const location = useLocation();

  return (
    <nav>
      <Link
        to="/"
        className={location.pathname === "/" ? "neon" : ""}
      >
        Home
      </Link>
      <Link
        to="/random-outfit-generator"
        className={location.pathname === "/random-outfit-generator" ? "neon" : ""}
      >
        Generator
      </Link>
      <Link
        to="/favorites"
        className={location.pathname === "/favorites" ? "neon" : ""}
      >
        Favorite
      </Link>
    </nav>
  );
};

export default Navigate;
