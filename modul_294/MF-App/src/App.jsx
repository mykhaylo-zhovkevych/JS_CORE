import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Board from './components/Board';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Board />
      <Routes>
    
      </Routes>
    </BrowserRouter>
  );
}

export default App
