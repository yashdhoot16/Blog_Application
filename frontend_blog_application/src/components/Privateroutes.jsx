import React from "react";
import { isLoggedIn } from "../auth";
import { Outlet , Navigate} from "react-router-dom";

const Privateroutes = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
};

export default Privateroutes;
