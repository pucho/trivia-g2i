import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Question } from "./components/Question";

function App() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const {
          data: { results },
        } = await axios(
          "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
        );
        //encoder &encode=url3986
        setQuestions(results);
        setIsLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchQuestions();
  };

  const gameStarted = !!questions.length > 0;
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
      {gameStarted && <Question data={questions[0]} />}
    </div>
  );
}

export default App;
