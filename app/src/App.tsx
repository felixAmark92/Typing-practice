import { useState } from "react";
import TypingBox from "./components/TypingBox";
import "./styles/typing-box.css";
import "./index.css";
import PromptForm from "./components/PromptForm";
import Navbar from "./components/Navbar";
import Stats from "./components/stats";
import Footer from "./components/Footer";

const App = () => {
  const [quote, setQuote] = useState(
    "Type into the request box to the left to get custom AI generated text"
  );
  const [isSelected, setIsSelected] = useState(false);
  const [disableGenerateBtn, setDisableGenerateBtn] = useState(false);
  const [result, setResult] = useState<TypingResult>({
    wpm: "-",
    errors: "-",
    finalScore: "-",
  });

  const getNewQuote = async (req: PromptRequest) => {
    try {
      setResult({ wpm: "-", errors: "-", finalScore: "-" });
      setQuote("");
      setDisableGenerateBtn(true);
      const response = await fetch(
        "https://typing-practice-server.azurewebsites.net/chatgtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        }
      );
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
            <p className="text-4xl text-slate-600 bebas-neue-regular font-bold mb-6">
              GPT Typing practice
            </p>
            <p className=" text-slate-600">
              Practice typing AI Generated texts to stimulate your mind while
              exercising your fingers! Learn to type faster in your own language
              and with texts that suits your needs.
            </p>
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
      <Footer />
    </>
  );
};

export default App;
