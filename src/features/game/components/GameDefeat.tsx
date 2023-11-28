import GameRestartButton from "./GameRestartButton";

interface Props {
  restart: () => void;
}

const GameDefeat = ({ restart }: Props) => {
  return (
    <div>
      <h2>YOU LOST</h2>
      <GameRestartButton restart={restart} />
    </div>
  );
};

export default GameDefeat;
