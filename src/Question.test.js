import { render, screen } from "@testing-library/react";
import App from "./App";
import { Question } from "./components/Question";

const data = {
  category: "History",
  type: "boolean",
  difficulty: "hard",
  question: "The Kingdom of Prussia briefly held land in Estonia.",
  correct_answer: "False",
  incorrect_answers: ["True"],
};

test("Renders category", () => {
  render(<Question data={data} nextQuestion={() => {}} />);
  const linkElement = screen.getByText(/History/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders question", () => {
  render(<Question data={data} nextQuestion={() => {}} />);
  const linkElement = screen.getByText(/Estonia/i);
  expect(linkElement).toBeInTheDocument();
});
