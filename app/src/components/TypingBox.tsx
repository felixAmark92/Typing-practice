import { useEffect, useState } from "react";
import unvalidKey from "../lib/unvalidKey";

const TypingBox = () => {
  const [curCharId, setCurrentCharId] = useState(0);

  const [text, setText] = useState("".split(""));

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
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

      const nextChar = document.getElementById((curCharId + 1).toString());
      nextChar?.classList.add("current");
      setCurrentCharId(curCharId + 1);
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
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    return () => {
      getQuote();
    };
  }, []);

  return (
    <div className="textbox">
      {text.map((char, i) => (
        <span key={i} id={i.toString()}>
          {char}
        </span>
      ))}
      <br />
    </div>
  );
};

export default TypingBox;
