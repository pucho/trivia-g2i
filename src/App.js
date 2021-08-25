import React, { useState } from "react";
import axios from "axios";
import { Question } from "./components/Question";
import { GameOver } from "./components/GameOver";
import { Box, Container, Button, Text, Flex } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

export const ColorBlindContext = React.createContext(true);

function App() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // TODO quiz could be user configurable
  const [quizLength, setQuizLength] = useState(10);

  const getQuestions = () => {
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
    <ChakraProvider>
      <Container
        centerContent
        maxW="container.lg"
        minHeight="100vh"
        justifyContent="space-between"
        alignContent="center"
        padding={12}
        background="gray.300"
      >
        {!gameStarted && (
          <>
            <Text fontSize="3xl">Welcome to the Trivia Challenge</Text>
            <Flex flexDirection="column" alignItems="center">
              <Text>
                You will be presented with 10 True or False questions.
              </Text>
              <Text>Can you score 100%</Text>
            </Flex>
            <Box>
              <Button
                onClick={() => {
                  getQuestions();
                }}
                width={36}
                colorScheme="green"
                isLoading={isLoading}
              >
                {error ? "Reload Questions" : "Begin"}
              </Button>
            </Box>
          </>
        )}
        {gameStarted && !gameOver && (
          <>
            <Question
              data={questions[currentQuestion]}
              nextQuestion={nextQuestion}
            />
            <Box>{`${currentQuestion + 1} of ${quizLength}`}</Box>
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
      </Container>
    </ChakraProvider>
  );
}

export default App;
