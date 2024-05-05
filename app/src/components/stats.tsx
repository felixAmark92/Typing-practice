import React from "react";
import Stat from "./stat";
import ErrorStat from "./ErrorStats";

interface Props {
  result: TypingResult;
}

const Stats = ({ result }: Props) => {
  return (
    <div className="sm:flex sm:space-x-4">
      <Stat text="WPM" data={result.wpm} />
      <ErrorStat text="Errors" data={result.errors} />
      <Stat text="Score" data={result.finalScore} />
    </div>
  );
};

export default Stats;
