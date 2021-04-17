export const Question = ({ data }) => {
  //TODO html parser, sanitize maybe?
  const { category, question } = data;
  return (
    <>
      <h1>{category}</h1>
      <div dangerouslySetInnerHTML={{ __html: question }}></div>
    </>
  );
};
