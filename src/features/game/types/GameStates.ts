export const gameState = {
  LOADING: "loading",
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
} as const;

export type GameState = (typeof gameState)[keyof typeof gameState];
