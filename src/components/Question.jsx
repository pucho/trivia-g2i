import { Button, Text, Box } from "@chakra-ui/react";

export const Question = ({ data, nextQuestion }) => {
  //TODO html parser, sanitize maybe?
  const { category, question } = data;

  return (
    <>
      <Text fontSize="3xl">{category}</Text>
      <Box dangerouslySetInnerHTML={{ __html: question }} flex="0.5"></Box>
      <Box>
        <Button
          colorScheme="blackAlpha"
          onClick={() => nextQuestion("True")}
          mr={4}
          w={24}
        >
          True
        </Button>
        <Button
          colorScheme="blackAlpha"
          onClick={() => nextQuestion("False")}
          w={24}
        >
          False
        </Button>
      </Box>
    </>
  );
};
