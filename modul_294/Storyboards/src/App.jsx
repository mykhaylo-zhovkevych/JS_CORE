// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SpielAnsicht from "./pages/SpielAnsicht";
import Impressum from "./pages/Impressum";
import Spielregeln from "./pages/Spielregeln";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" onClick={reloadPage}>
            Spielansicht
          </Link>{" "}
          |<Link to="/impressum">Impressum</Link> |
          <Link to="/spielregeln">Spielregeln</Link>
        </nav>
        <Routes>
          <Route path="/" element={<SpielAnsicht />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/spielregeln" element={<Spielregeln />} />
        </Routes>
      </div>
    </Router>
  );
}

// Funktion für das Neuladen der Seite
const reloadPage = () => {
  window.location.reload(); // Dies wird die gesamte Seite neu laden
};

export default App;
