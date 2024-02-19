import { useEffect, useState } from "react";
import TypingBox from "./components/TypingBox";
import "./styles/typing-box.css";

let App = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch("http://localhost:3000");
        const data = await response.json();
        setQuote(data.quote);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    return () => {
      getQuote();
    };
  }, []);

  return (
    <>
      <TypingBox quote={quote} />
    </>
  );
};

export default App;
