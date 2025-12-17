import { Outlet } from "react-router-dom";
import { NavBar } from "../shared/components/NavBar";


export function AppLayout() {


  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}
