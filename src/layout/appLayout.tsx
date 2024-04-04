import { Navbar } from "../components/navbar";

import "toastr/build/toastr.min.js";

import "bootswatch/dist/slate/bootstrap.css";
import "toastr/build/toastr.css";
import "../custom.css";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
