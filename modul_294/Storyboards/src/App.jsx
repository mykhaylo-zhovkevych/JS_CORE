// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SpielAnsicht from "./pages/SpielAnsicht";
import Impressum from "./pages/Impressum";
import Spielregeln from "./pages/Spielregeln";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      {/* GlobalNavigation */}
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<SpielAnsicht />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/spielregeln" element={<Spielregeln />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
