import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { NoAuthRoutes } from "./noAuthRoutes";
import { UserRoutes } from "./userRoutes";

export function MainRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>{user ? <UserRoutes /> : <NoAuthRoutes />}</BrowserRouter>
  );
}
