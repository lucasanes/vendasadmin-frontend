import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
} from "@nextui-org/react";
import { FormEvent, useState } from "react";
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

  const [error, setError] = useState<{ msg: string; input: string } | null>(
    null
  );

  function emailValidator() {
    if (email && !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      setError({ msg: "Informe um Email válido.", input: "email" });
      return;
    }
    setError(null);
  }

  async function signInButton(e: FormEvent) {
    e.preventDefault();

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
              isInvalid={error?.input == "email"}
              onBlur={emailValidator}
              errorMessage={error?.input == "email" && error.msg}
              placeholder="eu@exemplo.com"
            />
            <PasswordInput
              autoComplete="off"
              value={pass}
              onValueChange={setPass}
            />
            <div
              style={{
                margin: "-1rem 0 -.5rem 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                size="sm"
                isSelected={rememberMe}
                onValueChange={setRememberMe}
              >
                Lembrar-me
              </Checkbox>

              <Button
                style={{ background: "none", padding: "0" }}
                color="primary"
                variant="light"
                as={Link}
                to="/forgot"
              >
                Esqueceu sua senha?
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter style={{ gap: "10px" }}>
            <Button color="success" variant="flat" type="submit">
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
