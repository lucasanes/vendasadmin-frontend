import { Route, Routes } from "react-router-dom";

import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Forgot } from "../pages/forgot";

export function NoAuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
