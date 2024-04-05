import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import * as S from "./styles";

export function AppLayout() {
  return (
    <S.Container>
      <Navbar />

      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
}
