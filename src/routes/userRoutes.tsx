import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../layout/appLayout";
import { ConsultCompanies } from "../pages/companies/consultCompanies";
import { RegisterCompanies } from "../pages/companies/registerCompanies";
import { Home } from "../pages/home";
import { Register } from "../pages/register";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/consult-companie" element={<ConsultCompanies />} />
        <Route path="/register-user" element={<Register />} />
        <Route path="/register-companie/" element={<RegisterCompanies />} />
      </Route>
    </Routes>
  );
}
