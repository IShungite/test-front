import GameAttempt from "../types/GameAttemps";
import { wordStateColors } from "../types/WordStateColors";

interface Props {
  attempts: GameAttempt[];
  attemptIndex: number;
  letterIndex: number;
  guess: string[];
}

const GameLetter = ({ attempts, guess, attemptIndex, letterIndex }: Props) => {
  if (attempts.length === attemptIndex) {
    return <div key={letterIndex}>{guess[letterIndex] ?? "_"}</div>;
  }

  const attempt = attempts[attemptIndex];

  if (!attempt) {
    return <div key={letterIndex}>[]</div>;
  }

  return (
    <div
      style={{
        backgroundColor: wordStateColors[attempt.state[letterIndex]],
      }}
      key={letterIndex}
    >
      {attempt.word[letterIndex]}
    </div>
  );
};

export default GameLetter;
