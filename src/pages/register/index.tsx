import { FormEvent, useEffect, useState } from "react";

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
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";
import * as S from "./styles";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [error, setError] = useState<{ msg: string; input: string } | null>(
    null
  );

  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }, []);

  function emailValidator() {
    if (email && !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      setError({ msg: "Informe um Email válido.", input: "email" });
      return;
    }
    setError(null);
  }

  function register(e: FormEvent) {

    e.preventDefault();

    if (pass !== repeatPass) {
      toast.error("As Senhas informadas são diferentes.");
      return;
    }

    api
      .post("/api/usuarios/salvar", {
        name,
        email,
        pass,
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
      {!user && (
        <div className="header">
          <img width={40} src={logo} />
          <h1>Sigeve Web</h1>
        </div>
      )}
      <S.CardComponent>
        <form onSubmit={register}>
          <CardHeader>
            <h1 style={{ fontSize: "20px" }}>Cadastro</h1>
          </CardHeader>
          <Divider />
          <CardBody className="form">
            <Input
              isRequired
              labelPlacement="outside"
              label="Nome"
              value={name}
              onValueChange={setName}
              startContent={<LuUserCircle className="pallet" size={20} />}
              placeholder="Vanessa"
              disabled={disabled}
            />
            <Input
              isRequired
              labelPlacement="outside"
              type="email"
              label="Email"
              value={email}
              onValueChange={setEmail}
              startContent={<MdOutlineEmail className="pallet" size={20} />}
              placeholder="eu@exemplo.com"
              disabled={disabled}
              onBlur={emailValidator}
              isInvalid={error?.input == "email"}
              errorMessage={error?.input == "email" && error.msg}
            />
            <PasswordInput
              value={pass}
              onValueChange={setPass}
              disabled={disabled}
            />
            <PasswordInput
              label="Repita sua senha"
              placeholder="Digite sua senha novamente"
              value={repeatPass}
              onValueChange={setRepeatPass}
              disabled={disabled}
            />
          </CardBody>
          <Divider />
          <CardFooter className="footer">
            <Button color="success" variant="flat" type="submit">
              Cadastrar
            </Button>
            <Button color="danger" variant="flat" as={Link} to="/">
              {!user ? "Entrar em conta" : "Voltar"}
            </Button>
          </CardFooter>
        </form>
      </S.CardComponent>
    </S.Container>
  );
}
