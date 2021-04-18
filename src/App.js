import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Question } from "./components/Question";
import { GameOver } from "./components/GameOver";

function App() {
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
    <div className="App">
      {!gameStarted && (
        <>
          <h1>Welcome to the Trivia Challenge</h1>
          <div>You will be presented with 10 True or False questions.</div>
          <div>Can you score 100%</div>
          <button
            onClick={() => {
              getQuestions();
            }}
          >
            {error ? "Reload Questions" : "Start"}
          </button>
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
  );
}

export default App;
