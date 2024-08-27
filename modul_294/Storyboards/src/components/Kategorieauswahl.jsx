import React from "react";

function Kategorieauswahl({ onCategoryChange }) {
  return (
    <div>
      <h2>Wähle eine Kategorie</h2>
      <button onClick={() => onCategoryChange("Science")}>Wissenschaft</button>
      <button onClick={() => onCategoryChange("Math")}>Mathematik</button>
      <button onClick={() => onCategoryChange("Philosophie")}>
        Philosophie
      </button>
      <button onClick={() => onCategoryChange("Geschichte")}>Geschichte</button>
    </div>
  );
}

export default Kategorieauswahl;
