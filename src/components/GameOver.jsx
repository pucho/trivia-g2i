import "./GameOver.scss";
import { Button } from "../components/Button";
import { Title } from "../components/Title";

import { ReactComponent as CheckMark } from "../assets/check.svg";
import { ReactComponent as Close } from "../assets/close.svg";

export const GameOver = ({ score, quizLength, reset, questions }) => {
  return (
    <div className="container">
      <Title>You scored</Title>
      <div>{`${score} / ${quizLength}`}</div>
      <div>
        {questions.map((question, index) => {
          return (
            <div key={index} className="question">
              <div>
                {question.wasCorrectlyAnswered ? (
                  <CheckMark height={24} width={24} fill="#cc79a7" />
                ) : (
                  <Close height={22} width={22} fill="#cc79a7" />
                )}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: question.question }}
              ></div>
            </div>
          );
        })}
      </div>
      <Button onClick={reset}>Play Again?</Button>
    </div>
  );
};
