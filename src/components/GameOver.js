import React from "react";

export const GameOver = ({ score, questions, resetGame }) => {
  let level = "dudd";
  let gifSrc =
    "https://media.giphy.com/media/bjfv14wZU7PiM/giphy-downsized-large.gif";

  if (score === questions.length) {
    level = "god";
    gifSrc = "https://media.giphy.com/media/xT0GqssRweIhlz209i/giphy.gif";
  } else if (score >= questions.length / 2) {
    level = "ace";
    gifSrc = "https://media.giphy.com/media/aLTFHi2aowjJe/giphy.gif";
  }

  return (
    <>
      <div className="score-section">
        <div className="gif-section">
          <img
            src={gifSrc}
            title="end-of-game"
            alt="Trivia Title"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <h1>{`You are a Trivia ${level}!`}</h1>
        <p>
          You got {score} out of {questions.length} questions right!
        </p>
        <p>
          Your best score so far was 4 out of 5 questions which you got on
          2/22/22
        </p>
      </div>
      <button onClick={resetGame}>Play Again</button>
    </>
  );
};

export default GameOver;
