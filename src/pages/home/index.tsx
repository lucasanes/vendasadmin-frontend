import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import * as S from "./styles";

export function Home() {
  return (
    <S.Container>
      <S.Content>
        <h1>Bem vindo!</h1>
        <span>Esse é seu Sistema de Gerenciamento de Vendas.</span>
        <div className="line"></div>
        <p>
          E essa é sua área administrativa, utilize um dos menus ou botões
          abaixo para navegar pelo sistema.
        </p>
        <div className="buttons">
          <Button
            variant="flat"
            color="danger"
            as={Link}
            to="/register-user"
            role="button"
          >
            Cadastrar Usuário
          </Button>
          <Button
            variant="flat"
            color="success"
            as={Link}
            to="/register-companie"
            role="button"
          >
            Cadastrar Nota Fiscal
          </Button>
        </div>
      </S.Content>
    </S.Container>
  );
}
