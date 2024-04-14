import { useEffect, useState } from "react";
import unvalidKey from "../lib/unvalidKey";

interface Props {
  onIsDone: () => void;
}

const TypingBox = ({ onIsDone }: Props) => {
  const [curCharId, setCurrentCharId] = useState(0);
  const [words, setWords] = useState("".split(""));
  const [text, setText] = useState("".split(""));
  const [isDone, setIsDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [minuteDecimal, setMinuteDecimal] = useState(0);
  const [start, setStart] = useState(Date.now());

  const getTime = () => {
    const time = Date.now() - start;
    setMinuteDecimal(Math.floor(time) / 1000 / 60);
  };

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if (isDone) {
        return;
      }
      const key: string = event.key;
      console.log("key:", key);

      if (unvalidKey(key)) {
        return;
      }

      const curChar = document.getElementById(curCharId.toString());
      if (curChar == null) {
        return;
      }

      if (key == "Backspace") {
        curChar.classList.remove("current");
        const prevChar = document.getElementById((curCharId - 1).toString());
        prevChar?.classList.add("current");
        prevChar?.classList.remove("success");
        prevChar?.classList.remove("failure");
        setCurrentCharId(curCharId - 1);

        return;
      }

      if (curChar.innerText === key) {
        curChar.classList.add("success");
      } else {
        curChar.classList.add("failure");
      }

      curChar.classList.remove("current");

      if (curCharId === text.length - 1) {
        setIsDone(true);
        getTime();

        onIsDone();
        return;
      }

      const nextChar = document.getElementById((curCharId + 1).toString());
      nextChar?.classList.add("current");
      setCurrentCharId(curCharId + 1);

      if (!hasStarted) {
        setStart(Date.now());
        setHasStarted(true);
      }
    };

    document.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  });

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch("http://localhost:3000/chatgtp");
        const data = await response.text();
        setText(data.split(""));
        setWords(data.split(" "));
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
      <div className="textbox">
        {text.map((char, i) => (
          <span key={i} id={i.toString()}>
            {char}
          </span>
        ))}
      </div>
      {isDone ? <p>WPM: {words.length / minuteDecimal}</p> : <p>Test</p>}
    </>
  );
};

export default TypingBox;
