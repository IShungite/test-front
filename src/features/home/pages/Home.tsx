import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();

  const handleClick = () => {
    nav("/game");
  };

  return (
    <div>
      <button onClick={handleClick}>Jouer!</button>
    </div>
  );
};

export default Home;
