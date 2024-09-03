// components/navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav-navbar">
      <Link to="/impressum">Impressum</Link> |
      <Link to="/gamerules">Gamerules</Link>
      {/* Weitere Links hier */}
    </nav>
  );
}

export default Navbar;
