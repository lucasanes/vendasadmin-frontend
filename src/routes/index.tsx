import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "../layout/appLayout";
import { ConsultCompanies } from "../pages/companies/consultCompanies";
import { RegisterCompanies } from "../pages/companies/registerCompanies";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { User } from "../pages/user";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<User />} />
          <Route path="/consult-companie" element={<ConsultCompanies />} />
          <Route
            path="/register-companie/:id"
            element={<RegisterCompanies />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
