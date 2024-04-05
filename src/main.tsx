import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MainRoutes } from "./routes";
import { GlobalStyles } from "./styles/global";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <MainRoutes />
    <GlobalStyles />
  </NextUIProvider>
);
