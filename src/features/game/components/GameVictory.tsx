import GameRestartButton from "./GameRestartButton";

interface Props {
  restart: () => void;
}

const GameVictory = ({ restart }: Props) => {
  return (
    <div>
      <h2>YOU WON</h2>
      <GameRestartButton restart={restart} />
    </div>
  );
};

export default GameVictory;
