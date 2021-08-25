import { Button, Text, Box, Flex } from "@chakra-ui/react";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export const GameOver = ({ score, quizLength, reset, questions }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="3xl">You scored</Text>
      <Box>{`${score} out of ${quizLength}`}</Box>
      <Box>
        {questions.map((question, index) => {
          return (
            <Flex key={index} marginBottom={4}>
              <Box>
                {question.wasCorrectlyAnswered ? (
                  <CheckIcon
                    height={6}
                    width={6}
                    color="green.300"
                    marginRight={2}
                  />
                ) : (
                  <CloseIcon
                    height={6}
                    width={6}
                    color="red.300"
                    marginRight={2}
                  />
                )}
              </Box>
              <Box
                dangerouslySetInnerHTML={{ __html: question.question }}
              ></Box>
            </Flex>
          );
        })}
      </Box>
      <Button colorScheme="green" onClick={reset}>
        Play Again?
      </Button>
    </Flex>
  );
};
