import { useState } from "react";
import Kategorieauswahl from "../components/Kategorieauswahl";
/* import FrageAnzeige from "../components/FrageAnzeige"; */
import Auswertung from "../components/Auswertung";

const questions = {
  Science: [
    {
      question: "Was ist das chemische Symbol für Wasser?",
      options: ["H2O", "O2", "CO2"],
      correct: "H2O",
    },
    {
      question: "Welcher Planet wird als Roter Planet bezeichnet?",
      options: ["Mars", "Erde", "Jupiter"],
      correct: "Mars",
    },
    {
      question: "Welcher Planet ist der grösste in unserem Sonnensystem?",
      options: ["Erde", "Jupiter", "Saturn"],
      correct: "Jupiter",
    },
  ],
  Math: [
    { question: "Was ist 2 + 2?", options: ["3", "4", "5"], correct: "4" },
    { question: "Was ist 9 / 3?", options: ["2", "3", "4"], correct: "3" },
    { question: "Was ist 7 * 8?", options: ["54", "56", "58"], correct: "56" },
  ],
  Philosophie: [
    {
      question: 'Wer sagte "Ich denke, also bin ich"?',
      options: ["Platon", "Descartes", "Kant"],
      correct: "Descartes",
    },
    {
      question: 'Was ist der "kategorische Imperativ"?',
      options: ["Moralgesetz", "Gesellschaftsvertrag", "Naturgesetz"],
      correct: "Moralgesetz",
    },
    {
      question: 'Wer schrieb "Der Staat"?',
      options: ["Aristoteles", "Platon", "Sokrates"],
      correct: "Platon",
    },
  ],
  Geschichte: [
    {
      question: "Wer war der erste Präsident der Vereinigten Staaten?",
      options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"],
      correct: "George Washington",
    },
    {
      question: "In welchem Jahr endete der Zweite Weltkrieg?",
      options: ["1942", "1945", "1950"],
      correct: "1945",
    },
    {
      question: 'Wer war als "Eiserner Kanzler" bekannt?',
      options: ["Bismarck", "Napoleon", "Churchill"],
      correct: "Bismarck",
    },
  ],
};

function SpielAnsicht() {
  const [category, setCategory] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setQuestionIndex(0);
    setScore(0);
    setCompleted(false);
  };

  const handleAnswer = (selectedAnswer) => {
    if (questions[category][questionIndex].correct === selectedAnswer) {
      setScore(score + 1);
    }
    
    // this will ende the question wehn it reaches the end
    if (questionIndex < questions[category].length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

/*   function FrageAnzeige({ question, onAnswer }) {
    return (
      <div>
        <h2>{question.question}</h2>
        {question.options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    );
  } */

  return (
    <div className="main-block">
      <h1>Quiz Spiel</h1>


      {/* hier wird zuerst die div  */}
      {category === null ? (
        /* 
        Wenn category den Wert null hat, bedeutet dies, dass der Benutzer noch keine Kategorie ausgewählt hat. Daher wird die Kategorieauswahl-Komponente gerendert.
        Diese Komponente hat eine onCategoryChange-Prop, die auf die Funktion handleCategoryChange verweist. Diese Funktion wird aufgerufen, wenn der Benutzer eine Kategorie auswählt, um die category-State zu aktualisieren und das Quiz zu starten.
        */
        <Kategorieauswahl onCategoryChange={handleCategoryChange} />
      ) : completed ? (
        // Wenn completed true ist, bedeutet dies, dass das Quiz abgeschlossen ist. Daher wird die Auswertung-Komponente gerendert.
        // Diese Komponente erhält score und total als Props, um die Ergebnisse des Quiz anzuzeigen.
        <Auswertung score={score} total={questions[category].length} />
      ) : (
        <div> 
          {/* renderet die Frage abssiered aud dem user Auswahl */}
           <h2>{questions[category][questionIndex].question}</h2>
           {/* mit hilfe von map wird jedes Element von Array von options iteriert */}
           {questions[category][questionIndex].options.map((option) =>
           // für jede option von options Array wird eine button erstellt 
           // die button inhalt wir zu dem handelAnswer Funktionen über gegeben
            <button onClick={() => handleAnswer(option)}>
            {option}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SpielAnsicht;
