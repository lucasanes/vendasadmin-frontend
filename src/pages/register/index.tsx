import { useEffect, useState } from "react";

import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { LuUserCircle } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/img/bolsa.png";
import PasswordInput from "../../components/passwordInput";
import { api } from "../../services/api";
import * as S from "./styles";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepeticao, setSenhaRepeticao] = useState("");

  const [error, setError] = useState<{ msg: string; input: string } | null>(
    null
  );

  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (email && !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      setError({ msg: "Informe um Email válido.", input: "email" });
      return;
    }

    if (senha !== senhaRepeticao) {
      setError({ msg: "As Senhas informadas são diferentes.", input: "pass" });
      return;
    }

    setError(null);
  }, [email, senha, senhaRepeticao]);

  function registerError() {
    if (!nome) {
      return { msg: "O campo Nome é obrigatório.", input: "name" };
    }

    if (!email) {
      return { msg: "O campo Email é obrigatório.", input: "email" };
    }

    if (!senha || !senhaRepeticao) {
      return { msg: "Digite a Senha 2x.", input: "pass" };
    }
  }

  function register() {
    const error = registerError();

    if (error) {
      setError(error);
      return;
    }

    api
      .post("/api/usuarios/salvar", {
        nome,
        email,
        senha,
      })
      .then(() => {
        toast.success(
          "Usuário cadastrado com sucesso! Faça o login para acessar o sistema."
        );
        navigate("/");
      })
      .catch((erro) => {
        toast.error(erro.response.data);
      });
  }

  return (
    <S.Container>
      <div className="header">
        <img width={40} src={logo} />
        <h1>Sigeve Web</h1>
      </div>
      <S.CardComponent>
        <CardHeader>
          <h1 style={{ fontSize: "20px" }}>Cadastro</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={register}
            autoComplete="off"
          >
            <Input
              isRequired
              labelPlacement="outside"
              autoComplete="off"
              type="nome"
              label="Nome"
              value={nome}
              onValueChange={setNome}
              startContent={<LuUserCircle className="pallet" size={20} />}
              placeholder="Vanessa"
              disabled={disabled}
              isInvalid={error?.input == "name"}
              errorMessage={error?.input == "name" && error.msg}
            />
            <Input
              isRequired
              labelPlacement="outside"
              autoComplete="off"
              type="email"
              label="Email"
              value={email}
              onValueChange={setEmail}
              startContent={<MdOutlineEmail className="pallet" size={20} />}
              placeholder="eu@exemplo.com"
              disabled={disabled}
              isInvalid={error?.input == "email"}
              errorMessage={error?.input == "email" && error.msg}
            />
            <PasswordInput
              autoComplete="off"
              value={senha}
              onValueChange={setSenha}
              disabled={disabled}
              isInvalid={error?.input == "pass"}
              errorMessage={error?.input == "pass" && error.msg}
            />
            <PasswordInput
              label="Repita sua senha"
              placeholder="Digite sua senha novamente"
              autoComplete="off"
              value={senhaRepeticao}
              onValueChange={setSenhaRepeticao}
              disabled={disabled}
              isInvalid={error?.input == "pass"}
              errorMessage={error?.input == "pass" && error.msg}
            />
          </form>
        </CardBody>
        <Divider />
        <CardFooter style={{ gap: "10px" }}>
          <Button onClick={register}>Cadastrar</Button>
          <Button as={Link} to="/">
            Entrar em conta existente
          </Button>
        </CardFooter>
      </S.CardComponent>
    </S.Container>
  );
}
