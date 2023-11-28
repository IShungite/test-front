import { Button } from "@chakra-ui/react";

interface Props {
  restart: () => void;
}

const GameRestartButton = ({ restart }: Props) => {
  const handleClickRestart = () => {
    restart();
  };

  return <Button onClick={handleClickRestart}>Restart</Button>;
};

export default GameRestartButton;
