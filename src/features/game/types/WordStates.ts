export const wordStates = {
  CORRECT: "correct",
  PRESENT: "present",
  ABSENT: "absent",
} as const;

export type WordState = (typeof wordStates)[keyof typeof wordStates];
