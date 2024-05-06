import { useRef, useEffect, useState } from "react";
import { useClickAway } from "ahooks";
import unvalidKey from "../lib/unvalidKey";

interface Props {
  quote: string;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  onIsDone: (result: TypingResult) => void;
}

const TypingBox = ({ onIsDone, quote, isSelected, setIsSelected }: Props) => {
  const [curCharId, setCurrentCharId] = useState(0);
  const [words, setWords] = useState(quote.split(" "));
  const [text, setText] = useState(quote.split(""));
  const [isDone, setIsDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [minuteDecimal, setMinuteDecimal] = useState(0);
  const [start, setStart] = useState(Date.now());

  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const textbox = document.getElementById("textbox");

    if (isSelected) {
      textbox?.classList.remove("textbox-unselected");
      textbox?.classList.add("textbox-selected");
    } else {
      textbox?.classList.remove("textbox-selected");
      textbox?.classList.add("textbox-unselected");
    }

    return;
  }, [isSelected]);

  const ref = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    setIsSelected(false);
  }, ref);

  useEffect(() => {
    setCurrentCharId(0);
    setWords(quote.split(" "));
    setText(quote.split(""));
    setIsDone(false);
    setHasStarted(false);
    setMinuteDecimal(0);
    setStart(Date.now());
    setErrors(0);

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
    if (isDone) {
      const wpm = words.length / minuteDecimal;
      const penalty = text.length - errors * 2;

      const score = penalty <= 0 ? 0 : wpm * (penalty / text.length);

      const result: TypingResult = {
        wpm: wpm.toFixed(2),
        errors: errors.toString(),
        finalScore: score.toFixed(2),
      };
      onIsDone(result);
    }

    return;
  }, [isDone]);

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if (isDone || !isSelected) {
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

        if (prevChar?.classList.contains("failure")) {
          prevChar?.classList.remove("failure");
          setErrors(errors - 1);
        } else {
          prevChar?.classList.remove("success");
        }

        setCurrentCharId(curCharId - 1);

        return;
      }

      if (curChar.innerText === key) {
        curChar.classList.add("success");
      } else {
        curChar.classList.add("failure");
        setErrors(errors + 1);
      }

      curChar.classList.remove("current");

      if (curCharId === text.length - 1) {
        setIsDone(true);
        getTime();
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
    <div
      ref={ref}
      id="textbox"
      className="textbox"
      onClick={() => setIsSelected(true)}
    >
      {quote ? (
        text.map((char, i) => (
          <span key={i} id={i.toString()}>
            {char}
          </span>
        ))
      ) : (
        <div className="flex space-x-2 justify-center items-center h-20 ">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
          <div className="h-8 w-8 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
          <div className="h-8 w-8 bg-stone-400 rounded-full animate-bounce"></div>
        </div>
      )}
    </div>
  );
};

export default TypingBox;
