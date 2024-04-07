import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";
import * as S from "./styles";

export function AppLayout() {
  return (
    <S.Container>
      <Nav />

      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
}
