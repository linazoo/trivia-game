import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const Trivia = ({
  score,
  currentQuestion,
  questions,
  onCorrectAnswer,
  advanceNextQuestion
}) => {
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = React.useState(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);

  const handleClick = (isCorrect) => {
    setHasAnswered(true);
    if (isCorrect === true) {
      setAnsweredCorrectly(true);
      onCorrectAnswer();
    } else {
      setAnsweredCorrectly(false);
    }
  };

  const handleNextQuestionClick = () => {
    advanceNextQuestion();
    setHasAnswered(false);
  };
  // this handles when the user clicks the checkboxes for a multiple answer question - we check to see if the toggled item is the item that is selected and if it is we leave it as is and if its not we add it to a new array which is our updatedselectedanswers array which keeps the latest items
  const handleCheckboxChange = (toggledItem) => {
    console.log({ selectedAnswers, toggledItem });
    if (selectedAnswers.includes(toggledItem)) {
      const updatedSelectedAnswers = selectedAnswers.filter((selected) => {
        if (selected === toggledItem) {
          return false;
        } else {
          return true;
        }
      });
      console.log({ updatedSelectedAnswers });
      setSelectedAnswers(updatedSelectedAnswers);
    } else {
      setSelectedAnswers([...selectedAnswers, toggledItem]);
    }
    // is the answer already in the selectedAnswers
  };

  const handleMultipleAnswerQuestion = () => {
    // what are the answerOptions that are correct
    // what are the answers I have checked at the time of clicking submit
    // do they match?
    // this should compare the selectedAnswers to the questions[currentQuestion].answerOptions
    // how many answerOptions have isCorrect === true
    // if i do answerOptions.find((option) => option.answerText === answer)), will it be the same length as my selectedAnswers array
  };

  return (
    <>
      <div className="question-count">
        <p>
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <p>Score: {score}</p>
      </div>

      <div className="question-section">
        <div className="question-text">
          {questions[currentQuestion].questionText}
        </div>
      </div>

      {questions[currentQuestion].questionType === "multipleAnswer" ? (
        <div className="multiple-answer-section">
          <FormGroup>
            {questions[currentQuestion].answerOptions.map((answerOption) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        handleCheckboxChange(answerOption.answerText)
                      }
                    />
                  }
                  label={answerOption.answerText}
                />
                // <button
                //   disabled={hasAnswered}
                //   onClick={() => handleClick(answerOption.isCorrect)}
                //   key={answerOption.answerText}
                // >
                //   {answerOption.answerText}
                // </button>
              );
            })}
          </FormGroup>
          <button onClick={handleMultipleAnswerQuestion}>
            Set your asnwers!
          </button>
        </div>
      ) : (
        <div className="single-answer-section">
          {questions[currentQuestion].answerOptions.map((answerOption) => {
            if (questions[currentQuestion].questionType === "multipleAnswer") {
              return <Checkbox />;
            }
            return (
              <button
                disabled={hasAnswered}
                onClick={() => handleClick(answerOption.isCorrect)}
                key={answerOption.answerText}
              >
                {answerOption.answerText}
              </button>
            );
          })}
        </div>
      )}

      {hasAnswered ? (
        <>
          <div>
            {answeredCorrectly ? (
              <p>
                You got it right!
                <span aria-label="party emoji" role="img">
                  🥳
                </span>
              </p>
            ) : (
              <p>
                That was wrong
                <span aria-label="party emoji" role="img">
                  😳
                </span>
              </p>
            )}
          </div>
          <button
            onClick={handleNextQuestionClick}
            className="next-question-button"
          >
            Next Question
          </button>
        </>
      ) : null}
    </>
  );
};

export default Trivia;
