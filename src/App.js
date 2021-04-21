import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Title } from "./components/Title";
import { Question } from "./components/Question";
import { GameOver } from "./components/GameOver";
import { Button } from "./components/Button";

export const ColorBlindContext = React.createContext(true);

function App() {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizLength, setQuizLength] = useState(10);

  const getQuestions = () => {
    console.log("new questions");
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const {
          data: { results },
        } = await axios(
          `https://opentdb.com/api.php?amount=${quizLength}&difficulty=hard&type=boolean`
        );
        setQuestions(results);
        setIsLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchQuestions();
  };

  const nextQuestion = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
      questions[currentQuestion].wasCorrectlyAnswered = true;
    } else {
      questions[currentQuestion].wasCorrectlyAnswered = false;
    }
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };

  const gameReset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setQuestions([]);
  };

  const gameStarted = !!questions.length > 0;
  const gameOver = currentQuestion + 1 > questions.length && gameStarted;
  return (
    <ColorBlindContext.Provider value={colorBlindMode}>
      <div className={`App ${colorBlindMode && "color-blind"}`}>
        {!gameStarted && (
          <>
            <Title>Welcome to the Trivia Challenge</Title>
            <div className="content">
              <div>You will be presented with 10 True or False questions.</div>
              <div>Can you score 100%</div>
            </div>
            <Button
              onClick={() => {
                getQuestions();
              }}
            >
              {error ? "Reload Questions" : "Begin"}
            </Button>
            {!error && isLoading && <div>Loading Questions</div>}
          </>
        )}
        {gameStarted && !gameOver && (
          <>
            <Question
              data={questions[currentQuestion]}
              nextQuestion={nextQuestion}
            />
            <div>{`${currentQuestion + 1} of ${quizLength}`}</div>
          </>
        )}
        {gameOver && (
          <GameOver
            score={score}
            quizLength={quizLength}
            reset={gameReset}
            questions={questions}
          />
        )}
      </div>
    </ColorBlindContext.Provider>
  );
}

export default App;
