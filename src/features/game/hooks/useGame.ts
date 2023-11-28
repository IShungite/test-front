import { useCallback, useState } from "react";
import { getRandomWord } from "../services/randomWordService";
import { GameState, gameState } from "../types/GameStates";
import { WordState, wordStates } from "../types/WordStates";
import GameAttempt from "../types/GameAttemps";

const useGameEngine = () => {
  const [word, setWord] = useState("");
  const [attempts, setAttempts] = useState<GameAttempt[]>([]);
  const [maxAttempts] = useState(6);
  const [state, setState] = useState<GameState>(gameState.LOADING);
  const [lettersUsed, setLettersUsed] = useState<Set<string>>(new Set());

  const start = useCallback(async () => {
    await generateWord();
    setState(gameState.PLAYING);
  }, []);

  const restart = useCallback(async (): Promise<void> => {
    reset();
    await start();
  }, [start]);

  const generateWord = async (): Promise<void> => {
    const newWord: string = await getRandomWord();
    setWord(newWord);
  };

  const victory = (): void => {
    setState(gameState.WON);
  };

  const defeat = (): void => {
    setState(gameState.LOST);
  };

  const getAttemptWordState = useCallback(
    (attempt: string): WordState[] => {
      const attemptWordStates: WordState[] = [];

      attempt.split("").forEach((letter, index) => {
        if (letter === word[index]) {
          attemptWordStates.push(wordStates.CORRECT);
        } else if (word.includes(letter)) {
          attemptWordStates.push(wordStates.PRESENT);
        } else {
          attemptWordStates.push(wordStates.ABSENT);
        }
      });

      return attemptWordStates;
    },
    [word],
  );

  const processWord = useCallback(
    (guess: string): GameAttempt => {
      const wordState: WordState[] = getAttemptWordState(guess);
      const attempt: GameAttempt = { word: guess, state: wordState };
      setAttempts((prev) => [...prev, attempt]);
      return attempt;
    },
    [getAttemptWordState],
  );

  const isAttemptCorrect = useCallback((attempt: GameAttempt): boolean => {
    return attempt.state.every((state) => state === wordStates.CORRECT);
  }, []);

  const areAllAttemptsDone = useCallback((): boolean => {
    return attempts.length + 1 === maxAttempts;
  }, [attempts.length, maxAttempts]);

  const guess = useCallback(
    (guess: string): void => {
      if (state !== gameState.PLAYING) {
        return;
      }

      console.log("guess", guess);

      const attempt = processWord(guess);
      addLettersUsed(guess);

      if (isAttemptCorrect(attempt)) {
        victory();
        return;
      }

      if (areAllAttemptsDone()) {
        defeat();
        return;
      }
    },
    [areAllAttemptsDone, processWord, isAttemptCorrect, state],
  );

  const addLettersUsed = (attempt: string): void => {
    attempt.split("").forEach((letter) => {
      setLettersUsed((prevLettersUsed) => new Set(prevLettersUsed).add(letter));
    });
  };

  const getWordLength = useCallback((): number => {
    return word.length;
  }, [word]);

  const reset = (): void => {
    setAttempts([]);
    setLettersUsed(new Set());
    setState(gameState.LOADING);
    setWord("");
  };

  return {
    guess,
    start,
    restart,
    getWordLength,
    maxAttempts,
    attempts,
    state,
    lettersUsed,
  };
};

export default useGameEngine;
