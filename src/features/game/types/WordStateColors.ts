import { wordStates } from "./WordStates";

export const wordStateColors = {
  [wordStates.CORRECT]: "#fe5f57", // red
  [wordStates.PRESENT]: "#faf23a", // yellow
  [wordStates.ABSENT]: "#57c9fe", // blue
} as const;

export type WordStateColor =
  (typeof wordStateColors)[keyof typeof wordStateColors];
