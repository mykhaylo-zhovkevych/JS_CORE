import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Gamefield() {
  // logic

  const questions = [
    {
      question: "Welcher Fluss ist der längste",
      answers: ["Nil", "Amazon", "Dnipro"],
      answer: "Nil",
    },
  ];

  const [category, setCategory] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  return <Outlet />;
}

export default Gamefield;
