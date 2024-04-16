import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { NoAuthRoutes } from "./noAuthRoutes";
import { UserRoutes } from "./userRoutes";

export function MainRoutes() {
  const { user } = useAuth();

  const [renders, setRenders] = useState(0);

  useEffect(() => {
    setRenders((prev) => prev + 1);
  }, [user]);

  return (
    <BrowserRouter>
      {user ? <UserRoutes /> : renders > 1 && <NoAuthRoutes />}
    </BrowserRouter>
  );
}
