import { useEffect, useState } from "react";
import TypingBox from "./components/TypingBox";
import "./styles/typing-box.css";
import "./index.css";
import PromptForm from "./components/PromptForm";

let App = () => {
  const [quote, setQuote] = useState("");

  const getNewQuote = async (req: PromptRequest) => {
    try {
      setQuote("");
      const response = await fetch("http://localhost:3000/chatgtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await response.text();
      console.log(data);
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  return (
    <>
      <TypingBox
        quote={quote}
        onIsDone={() => {
          console.log("you are done fucker!");
        }}
      />
      <PromptForm sendRequest={getNewQuote} />
    </>
  );
};

export default App;
