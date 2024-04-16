import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/img/bolsa.png";
import PasswordInput from "../../components/passwordInput";
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";
import * as S from "./styles";

export function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const { signIn } = useAuth();

  async function signInButton() {
    api
      .post("/api/usuarios/autenticar", { email, senha: pass })
      .then((response) => {
        signIn(response.data.user, response.data.token, rememberMe);
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
        <form onSubmit={signInButton}>
          <CardHeader>
            <h1 style={{ fontSize: "20px" }}>Login</h1>
          </CardHeader>
          <Divider />
          <CardBody
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
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
            />
            <PasswordInput
              autoComplete="off"
              value={pass}
              onValueChange={setPass}
            />
            <Checkbox
              size="sm"
              isSelected={rememberMe}
              onValueChange={setRememberMe}
            >
              Lembrar-me
            </Checkbox>
          </CardBody>
          <Divider />
          <CardFooter style={{ gap: "10px" }}>
            <Button color="success" variant="flat" onClick={signInButton}>
              Entrar
            </Button>
            <Button color="danger" variant="flat" as={Link} to="/register">
              Cadastrar Conta
            </Button>
          </CardFooter>
        </form>
      </S.CardComponent>
    </S.Container>
  );
}
