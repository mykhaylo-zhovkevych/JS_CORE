import React from "react";

function Auswertung({ score, total }) {
  return (
    <div>
      <h2>Auswertung</h2>
      <p>
        Du hast {score} von {total} Fragen richtig beantwortet.
      </p>
      {score === total ? (
        <p>🎉 Herzlichen Glückwunsch, du hast alles richtig gemacht! 🎉</p>
      ) : (
        <p>
          😢 Leider hast du nicht alle Fragen richtig beantwortet. Versuch es
          erneut! 😢
        </p>
      )}
    </div>
  );
}

export default Auswertung;
