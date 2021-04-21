import "./Button.css";
import { ColorBlindContext } from "../App";
import { useContext } from "react";

export const Button = ({ children, onClick }) => {
  const colorBlindMode = useContext(ColorBlindContext);
  console.log(colorBlindMode, "!!!!");
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
