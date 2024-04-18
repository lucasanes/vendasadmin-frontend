import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../layout/appLayout";
import ConsultCompanies from "../pages/companies/consultCompanies";
import EditCompany from "../pages/companies/editCompany";
import RegisterCompany from "../pages/companies/registerCompany";
import { Home } from "../pages/home";
import { Register } from "../pages/register";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/consult-companies" element={<ConsultCompanies />} />
        <Route path="/register-user" element={<Register />} />
        <Route path="/register-company/" element={<RegisterCompany />} />
        <Route path="/edit-company/:id" element={<EditCompany />} />
      </Route>
    </Routes>
  );
}
