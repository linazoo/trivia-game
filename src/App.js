import React from "react";
import "./styles.css";
import { questions } from "./gameData.js";
import Trivia from "./components/Trivia";
import GameOver from "./components/GameOver";
// import WelcomeScreen from "./components/WelcomeScreen";

// const questionTypes = ["singleAnswer", "multipleAnswers"];

export default function App() {
  const [score, setScore] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const advanceNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setGameOver(true);
    }
  };

  const incrementScore = () => {
    setScore(score + 1);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="app">
      {/* <WelcomeScreen /> */}
      {gameOver ? (
        <GameOver score={score} questions={questions} resetGame={resetGame} />
      ) : (
        <>
          <Trivia
            score={score}
            questions={questions}
            currentQuestion={currentQuestion}
            onCorrectAnswer={incrementScore}
            advanceNextQuestion={advanceNextQuestion}
          />
        </>
      )}
    </div>
  );
}
