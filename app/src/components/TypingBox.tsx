import { Component, useEffect, useState } from "react";
import unvalidKey from "../lib/unvalidKey";

interface Props {
  quote: string;
  onIsDone: () => void;
}

const TypingBox = ({ onIsDone, quote }: Props) => {
  const [curCharId, setCurrentCharId] = useState(0);
  const [words, setWords] = useState(quote.split(" "));
  const [text, setText] = useState(quote.split(""));
  const [isDone, setIsDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [minuteDecimal, setMinuteDecimal] = useState(0);
  const [start, setStart] = useState(Date.now());

  useEffect(() => {
    setCurrentCharId(0);
    setWords(quote.split(" "));
    setText(quote.split(""));
    setIsDone(false);
    setHasStarted(false);
    setMinuteDecimal(0);
    setStart(Date.now());

    for (let i = 0; i < text.length; i++) {
      const char = document.getElementById(i.toString());
      char?.classList.remove("success");
      char?.classList.remove("failure");
      char?.classList.remove("current");
    }
    const first = document.getElementById((0).toString());
    first?.classList.add("currenth");

    return;
  }, [quote]);

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
