import { HStack, Spinner, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import GameDefeat from "../components/GameDefeat";
import GameLetter from "../components/GameLetter";
import GameLetterUsed from "../components/GameLetterUsed";
import GameVictory from "../components/GameVictory";
import useGameEngine from "../hooks/useGame";
import { gameState } from "../types/GameStates";

const Game = () => {
  const game = useGameEngine();

  const [guess, setGuess] = useState<string[]>([]);

  const handlePressKey = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          if (game.getWordLength() === guess.length) {
            game.guess(guess.join(""));
            setGuess([]);
          }
          break;
        case "Backspace":
          setGuess((prev) => prev.slice(0, -1));
          break;
        case "a":
        case "b":
        case "c":
        case "d":
        case "e":
        case "f":
        case "g":
        case "h":
        case "i":
        case "j":
        case "k":
        case "l":
        case "m":
        case "n":
        case "o":
        case "p":
        case "q":
        case "r":
        case "s":
        case "t":
        case "u":
        case "v":
        case "w":
        case "x":
        case "y":
        case "z":
          if (guess.length < game.getWordLength()) {
            setGuess((prev) => [...prev, e.key]);
          }
          break;
        default:
          break;
      }
    },
    [game, guess],
  );

  useEffect(() => {
    window.addEventListener("keydown", handlePressKey);

    return () => {
      window.removeEventListener("keydown", handlePressKey);
    };
  }, [handlePressKey]);

  useEffect(() => {
    game.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>MOTUS</div>

      {game.state === gameState.LOADING && <Spinner />}

      {game.state === gameState.WON && <GameVictory restart={game.restart} />}
      {game.state === gameState.LOST && <GameDefeat restart={game.restart} />}

      {game.state === gameState.PLAYING && (
        <VStack>
          {Array.from({ length: game.maxAttempts }).map((_, attemptIndex) => (
            <HStack key={attemptIndex}>
              {Array.from({ length: game.getWordLength() }).map(
                (_, letterIndex) => (
                  <GameLetter
                    key={letterIndex}
                    attempts={game.attempts}
                    guess={guess}
                    attemptIndex={attemptIndex}
                    letterIndex={letterIndex}
                  />
                ),
              )}
            </HStack>
          ))}
        </VStack>
      )}

      <GameLetterUsed lettersUsed={game.lettersUsed} />
    </>
  );
};

export default Game;
