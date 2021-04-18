export const GameOver = ({ score, quizLength, reset, questions }) => {
  return (
    <>
      <h1>You scored</h1>
      <div>{`${score} / ${quizLength}`}</div>
      <div>
        {questions.map((question, index) => {
          return (
            <div key={index}>
              <div>{`${question.wasCorrectlyAnswered ? "+" : "-"}`}</div>
              <div
                dangerouslySetInnerHTML={{ __html: question.question }}
              ></div>
            </div>
          );
        })}
      </div>
      <button onClick={reset}>Play Again?</button>
    </>
  );
};
