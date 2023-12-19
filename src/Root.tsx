import { Outlet } from "react-router";
import Header from "./screens/components/Header";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
