import { useEffect, useState } from "react";
import TypingBox from "./components/TypingBox";
import "./styles/typing-box.css";

let App = () => {
  const [quote, setQuote] = useState("");

  return (
    <>
      <TypingBox />
    </>
  );
};

export default App;