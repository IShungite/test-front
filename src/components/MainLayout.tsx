import { Outlet } from "react-router-dom";
import Headers from "./Headers";

const MainLayout = () => {
  return (
    <main>
      <Headers />

      <Outlet />
    </main>
  );
};

export default MainLayout;
