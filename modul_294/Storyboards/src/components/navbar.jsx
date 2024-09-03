// components/navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
          <Link to="/" onClick={reloadPage}>
            Spielansicht
          </Link>{" "}
          |<Link to="/impressum">Impressum</Link> |
          <Link to="/spielregeln">Spielregeln</Link>
        </nav>
  );
}

// Funktion für das Neuladen der Seite
const reloadPage = () => {
    window.location.reload(); // Dies wird die gesamte Seite neu laden
  };

export default Navbar;
