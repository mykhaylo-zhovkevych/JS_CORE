import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Impressum from './pages/impressum';
import Gamerules from './pages/gamerules';
import Gamefield from './pages/gamefield';
import Hooks from './pages/hooks';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Gamefield />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/gamerules" element={<Gamerules />} />
        </Routes>
      </main>
      <Hooks />
    </>
  );
}

export default App;

