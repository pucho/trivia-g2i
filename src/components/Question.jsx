export const Question = ({ data, nextQuestion }) => {
  //TODO html parser, sanitize maybe?
  const { category, question } = data;

  return (
    <>
      <h1>{category}</h1>
      <div dangerouslySetInnerHTML={{ __html: question }}></div>
      <div>
        <button onClick={() => nextQuestion("True")}>True</button>
        <button onClick={() => nextQuestion("False")}>False</button>
      </div>
    </>
  );
};
