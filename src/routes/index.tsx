import { BrowserRouter } from "react-router-dom";
import { NoAuthRoutes } from "./noAuthRoutes";

export function MainRoutes() {
  return (
    <BrowserRouter>
      <NoAuthRoutes />
      {/* <UserRoutes /> */}
    </BrowserRouter>
  );
}
