import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import moment from "moment";
import { FormEvent, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/img/bolsa.png";
import PasswordInput from "../../components/passwordInput";
import { api } from "../../services/api";
import * as S from "./styles";

export function Forgot() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [code, setCode] = useState("");

  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const [error, setError] = useState<{ msg: string; input: string } | null>(
    null
  );

  const navigate = useNavigate();

  function emailValidator() {
    if (email && !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      setError({ msg: "Informe um Email válido.", input: "email" });
      return;
    }
    setError(null);
  }

  function passValidator(e: string) {
    if (pass != e && e != passConfirm) {
      setError({ msg: "Senhas não coincidem.", input: "pass" });
      return;
    }
    setError(null);
  }

  function emailSend(e: FormEvent) {
    e.preventDefault();

    const hora = moment().format("HH:mm:ss");

    api
      .post("/api/recuperacao/gerar", { email, hora })
      .then(() => {
        toast.warning("O código expira em 5 minutos.");
        toast.success("Código enviado para o email informado.");
        setStep(2);
      })
      .catch((erro) => {
        toast.error(erro.response.data);
      });
  }

  function codeSend(e: FormEvent) {
    e.preventDefault();

    const hora = moment().format("HH:mm:ss");

    api
      .post(`/api/recuperacao/verificar/${code}`, { email, hora })
      .then(() => {
        toast.success("Código validado com sucesso.");
        setStep(3);
      })
      .catch((erro) => {
        toast.error(erro.response.data);

        if (erro.response.data == "Código expirado.") {
          setStep(1);
        }
      });
  }

  function passChange(e: FormEvent) {
    e.preventDefault();

    if (pass !== passConfirm) {
      return;
    }

    api
      .put(`/api/usuarios/alterarSenha/${email}`, { senha: pass })
      .then(() => {
        toast.success("Senha alterada com sucesso.");
        navigate("/");
      })
      .catch((erro) => {
        toast.error(erro.response.data);
      });
  }

  function stepOne(): JSX.Element {
    return (
      <>
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
          isInvalid={error?.input == "email"}
          onBlur={emailValidator}
          errorMessage={error?.input == "email" && error.msg}
        />
      </>
    );
  }

  function stepTwo(): JSX.Element {
    return (
      <>
        <Input
          isRequired
          labelPlacement="outside"
          autoComplete="off"
          type="code"
          label="Código"
          value={code.toLocaleUpperCase()}
          onValueChange={(e) => {
            const all = e.substring(0, e.length - 1);
            const last = e[e.length - 1];

            if (e.length == 0) {
              setCode("");
              return;
            }

            if (e.length % 2 === 1) {
              if (last.match(/[a-zA-Z]/)) {
                setCode(all + last.toUpperCase());
              }
            } else {
              if (last.match(/[0-9]/)) {
                setCode(all + last);
              }
            }
          }}
          startContent={<IoKeyOutline className="pallet" size={20} />}
          placeholder="A1B2C3"
          minLength={6}
          maxLength={6}
        />
      </>
    );
  }

  function stepThree(): JSX.Element {
    return (
      <>
        <PasswordInput
          autoComplete="off"
          value={pass}
          onValueChange={(e) => {
            setPass(e);
            passValidator(e);
          }}
        />

        <PasswordInput
          autoComplete="off"
          label="Confirmar Senha"
          value={passConfirm}
          onValueChange={(e) => {
            setPassConfirm(e);
            passValidator(e);
          }}
          isInvalid={error?.input == "pass"}
          errorMessage={error?.input == "pass" && error.msg}
        />
      </>
    );
  }

  return (
    <S.Container>
      <div className="header">
        <img width={40} src={logo} />
        <h1>Sigeve Web</h1>
      </div>

      <S.CardComponent>
        <form
          onSubmit={(e) =>
            step == 1 ? emailSend(e) : step == 2 ? codeSend(e) : passChange(e)
          }
        >
          <CardHeader>
            <h1 style={{ fontSize: "20px" }}>Recuperar Senha</h1>
          </CardHeader>
          <Divider />
          <CardBody
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {step == 1 ? stepOne() : step == 2 ? stepTwo() : stepThree()}
          </CardBody>
          <Divider />
          <CardFooter style={{ gap: "10px" }}>
            <Button type="submit" color="success" variant="flat">
              Enviar
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={() => {
                if (step == 1) {
                  navigate("/");
                  return;
                }
                setStep((prev) => prev - 1);
              }}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </S.CardComponent>
    </S.Container>
  );
}
