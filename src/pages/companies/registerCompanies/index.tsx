import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Switch,
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { cepMask, cnpjMask, cpfMask, phoneMask } from "../../../utils/masks";
import {
  validatorCNPJ,
  validatorCPF,
  validatorCel,
} from "../../../utils/validators";
import * as S from "./styles";

export function RegisterCompanies() {
  const [name, setName] = useState("");
  const [isCpf, setIsCpf] = useState(false);
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [cel, setCel] = useState("");
  const [subscribe, setSubscribe] = useState("");
  const [cep, setCep] = useState("");
  const [adress, setAdress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [noteNumber, setNoteNumber] = useState<number | null>(null);
  const [obs, setObs] = useState("");

  const [error, setError] = useState<{ msg: string; input: string } | null>(
    null
  );

  const navigate = useNavigate();

  const { user } = useAuth();

  function validateEmail() {
    if (email && !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      setError({ msg: "Informe um Email válido.", input: "email" });
      return;
    }
    setError(null);
  }

  function validateCpf() {
    if (cpf && !validatorCPF(cpf)) {
      setError({ msg: "CPF inválido", input: "cpf" });
      return;
    }

    setError(null);
  }

  function validateCnpj() {
    if (cnpj && !validatorCNPJ(cnpj)) {
      setError({ msg: "CNPJ inválido", input: "cnpj" });
      return;
    }

    setError(null);
  }

  function validateCel() {
    if (cel && !validatorCel(cel)) {
      setError({ msg: "Informe um número de celular válido.", input: "cel" });
      return;
    }
    setError(null);
  }

  function searchCep() {
    if (cep.length !== 8) return;

    axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
      setState(response.data.uf);
      setCity(response.data.localidade);
      setAdress(response.data.logradouro);
      setNeighborhood(response.data.bairro);
    });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    api
      .post("/api/empresas/salvar", {
        nome: name,
        cpfCnpj: isCpf ? cpf : cnpj,
        email,
        telefone: cel,
        inscricao: subscribe,
        cep,
        endereco: adress,
        uf: state,
        cidade: city,
        bairro: neighborhood,
        proximoNumeroNota: noteNumber,
        observacao: obs,
        usuarioId: user?.id,
      })
      .then(() => {
        navigate("/consult-companie");
        toast.success("Empresa cadastrada com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      });
  }

  return (
    <S.Container>
      <Card className="card">
        <form onSubmit={submit}>
          <CardHeader>
            <h1 style={{ fontSize: 20 }}>Cadastrar Empresas</h1>
          </CardHeader>

          <Divider />

          <CardBody className="form">
            <Input
              isRequired
              labelPlacement="inside"
              label="Nome"
              value={name}
              onValueChange={setName}
            />

            {isCpf ? (
              <Input
                isRequired
                maxLength={14}
                labelPlacement="inside"
                label="CPF"
                value={cpfMask(cpf)}
                onValueChange={(e: string) => setCpf(e.replace(/\D/g, ""))}
                onBlur={validateCpf}
                isInvalid={error?.input === "cpf"}
                errorMessage={error?.input === "cpf" && error?.msg}
              />
            ) : (
              <Input
                isRequired
                maxLength={18}
                labelPlacement="inside"
                label="CNPJ"
                value={cnpjMask(cnpj)}
                onValueChange={(e: string) => setCnpj(e.replace(/\D/g, ""))}
                onBlur={validateCnpj}
                isInvalid={error?.input === "cnpj"}
                errorMessage={error?.input === "cnpj" && error?.msg}
              />
            )}
            <Switch size="sm" isSelected={isCpf} onValueChange={setIsCpf}>
              Pessoa física?
            </Switch>

            <Input
              isRequired
              labelPlacement="inside"
              type="email"
              label="Email"
              value={email}
              onValueChange={setEmail}
              onBlur={validateEmail}
              isInvalid={error?.input === "email"}
              errorMessage={error?.input === "email" && error?.msg}
            />

            <Input
              isRequired
              maxLength={15}
              labelPlacement="inside"
              label="Celular"
              value={phoneMask(cel)}
              onValueChange={(e: string) => setCel(e.replace(/\D/g, ""))}
              onBlur={validateCel}
              isInvalid={error?.input === "cel"}
              errorMessage={error?.input === "cel" && error?.msg}
            />

            <Input
              isRequired
              labelPlacement="inside"
              label="Inscrição"
              value={subscribe}
              onValueChange={setSubscribe}
            />

            <Input
              isRequired
              maxLength={10}
              labelPlacement="inside"
              label="CEP"
              onBlur={searchCep}
              value={cepMask(cep)}
              onValueChange={(e: string) => setCep(e.replace(/\D/g, ""))}
            />

            <Input
              isRequired
              labelPlacement="inside"
              label="Endereço"
              value={adress}
              onValueChange={setAdress}
            />

            <Input
              isRequired
              labelPlacement="inside"
              label="Estado"
              value={state}
              onValueChange={setState}
            />

            <Input
              isRequired
              labelPlacement="inside"
              label="Cidade"
              value={city}
              onValueChange={setCity}
            />

            <Input
              isRequired
              labelPlacement="inside"
              label="Bairro"
              value={neighborhood}
              onValueChange={setNeighborhood}
            />

            <Input
              isRequired
              labelPlacement="inside"
              label="Próximo Número Nota"
              value={noteNumber?.toString()}
              onValueChange={(e: string) =>
                setNoteNumber(Number(e.replace(/\D/g, "")))
              }
            />

            <Input
              labelPlacement="inside"
              label="Observação"
              value={obs}
              onValueChange={setObs}
            />
          </CardBody>

          <Divider />

          <CardFooter className="buttons">
            <Button type="submit" color="success" variant="flat">
              Criar
            </Button>
            <Button
              as={Link}
              to={"/consult-companie"}
              color="danger"
              variant="flat"
            >
              Consultar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </S.Container>
  );
}
