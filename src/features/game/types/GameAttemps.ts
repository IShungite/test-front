import { WordState } from "./WordStates";

export default interface GameAttempt {
  word: string;
  state: WordState[];
}
