import { useEffect, useState } from "react";
import TypingBox from "./components/TypingBox";
import "./styles/typing-box.css";
import "./index.css";
import PromptForm from "./components/PromptForm";
import Navbar from "./components/Navbar";
import Stats from "./components/stats";

const App = () => {
  const [quote, setQuote] = useState("This is a basic text");
  const [isSelected, setIsSelected] = useState(false);
  const [disableGenerateBtn, setDisableGenerateBtn] = useState(false);
  const [result, setResult] = useState<TypingResult>({ wpm: "-", errors: "-" });

  const getNewQuote = async (req: PromptRequest) => {
    try {
      setResult({ wpm: "-", errors: "-" });
      setQuote("");
      setDisableGenerateBtn(true);
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
      setIsSelected(true);
      setDisableGenerateBtn(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4">
        <div className="col-span-1 bg-gray-200 h-5/6">
          <PromptForm
            sendRequest={getNewQuote}
            disableGenerateBtn={disableGenerateBtn}
          />
        </div>

        <div className="col-span-3 bg-gray-200 h-5/6">
          <div className="mx-auto w-2/3 mt-20">
            <Stats result={result} />
            <TypingBox
              isSelected={isSelected}
              setIsSelected={(value) => setIsSelected(value)}
              quote={quote}
              onIsDone={(result) => {
                setResult(result);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
