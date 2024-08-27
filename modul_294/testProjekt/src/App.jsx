import { useState } from "react";
/* import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */
import Button from "./Button";
import "./App.css";
// als erstet müssen die Resource importiert werden 
import sadSmiley from "./assets/sad-smiley-1621577154.png";
import smiley from "./assets/A_Smiley-2394676094.jpg";

/* 
function Listing() {
  return (
    <>
      <li>Guggus</li>
    </>
  );
} */

function App() {

// React Hook the function setCurrentImage ist für Image verantwortlich und es schaut dass es keine 
  const [currentImage, setCurrentImage] = useState(null);

  function buttonClikced(event) {
    // schreibe den Inhalt vom Event-Objekt ins #result
    console.log("i habe be cliked");

    document.getElementById("result").innerHTML = event.target.innerHTML;

    if (event.target.innerHTML === "Max") {
      setCurrentImage(smiley);
    }
    else {
      setCurrentImage(sadSmiley);
    }
    
  }

  // wenn Max machen richtig sonst falsch
  const answers = ["Max", "Glen", "Jan"];
  const answer_button = answers.map((a) => (
    // key eine interne JSX Feature
    <Button key={a} name={a} fun={buttonClikced} />
  ));

  return (
    <>
      <h1>hello world</h1>
      <hr />
      {/* Class hat in React eine andere Bedetung */}
      {/* Verbesserte Schreibeweise als unten */}
      <div className="answer-buttons"> {answer_button} </div>

      {/* <Button name = "Max" fun={buttonClikced} />
      <Button name = "Glen" fun={buttonClikced} />
      <Button name = "Jan" fun={buttonClikced} /> */}

      {currentImage && <img src={currentImage} alt="Result Smiley" />}


      <div id="result"></div>



    </>
  );
}

export default App;
/* export default Button macht die Button-Komponente für andere Dateien zugänglich, damit sie in der App-Komponente importiert und verwendet werden kann. Dadurch kannst du die Buttons dynamisch und wiederverwendbar rendern. */
