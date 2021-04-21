import { Button } from "../components/Button";
import { Title } from "../components/Title";

export const Question = ({ data, nextQuestion }) => {
  //TODO html parser, sanitize maybe?
  const { category, question } = data;

  return (
    <>
      <Title>{category}</Title>
      <div dangerouslySetInnerHTML={{ __html: question }}></div>
      <div>
        <Button onClick={() => nextQuestion("True")}>True</Button>
        <Button onClick={() => nextQuestion("False")}>False</Button>
      </div>
    </>
  );
};
