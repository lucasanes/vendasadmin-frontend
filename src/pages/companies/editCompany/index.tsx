import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spinner,
  Switch,
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

export default function RegisterCompany() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api
        .get(`/api/empresas/${id}`)
        .then((response) => {
          const company = response.data;

          setName(company.nome);

          if (company.cpfCnpj.length === 11) {
            setIsCpf(true);
            setCpf(company.cpfCnpj);
          } else {
            setCnpj(company.cpfCnpj);
          }

          setEmail(company.email);
          setCel(company.telefone);
          setSubscribe(company.inscricao);
          setCep(company.cep);
          setAdress(company.endereco);
          setState(company.uf);
          setCity(company.cidade);
          setNeighborhood(company.bairro);
          setNoteNumber(company.proximoNumeroNota);
          setObs(company.observacao);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

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

  const navigate = useNavigate();

  const { user } = useAuth();

  const [error, setError] = useState<
    Array<{
      msg: string;
      input: string;
    }>
  >([]);

  function validateEmail() {
    if (email && !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      setError((rest) => [
        ...rest,
        { msg: "Informe um Email válido.", input: "email" },
      ]);
      return;
    }
    setError(error.filter((e) => e.input !== "email"));
  }

  function validateCpf() {
    if (cpf && !validatorCPF(cpf)) {
      setError((rest) => [...rest, { msg: "CPF inválido", input: "cpf" }]);
      return;
    }

    setError(error.filter((e) => e.input !== "cpf"));
  }

  function validateCnpj() {
    if (cnpj && !validatorCNPJ(cnpj)) {
      setError((rest) => [...rest, { msg: "CNPJ inválido", input: "cnpj" }]);
      return;
    }

    setError(error.filter((e) => e.input !== "cnpj"));
  }

  function validateCel() {
    if (cel && !validatorCel(cel)) {
      setError((rest) => [
        ...rest,
        { msg: "Informe um número de celular válido.", input: "cel" },
      ]);
      return;
    }
    setError(error.filter((e) => e.input !== "cel"));
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
      .put(`/api/empresas/${id}`, {
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
        navigate("/consult-companies");
        toast.success("Alteração feita com sucesso!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  return (
    <S.Container>
      <Card className="card">
        <form onSubmit={submit}>
          <CardHeader>
            <h1 style={{ fontSize: 20 }}>Editar Empresas</h1>
          </CardHeader>

          <Divider />

          {loading ? (
            <CardBody>
              <Spinner />
            </CardBody>
          ) : (
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
                  isInvalid={error.some((e) => e.input === "cpf")}
                  errorMessage={error.filter((e) => e.input === "cpf")[0]?.msg}
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
                  isInvalid={error.some((e) => e.input === "cnpj")}
                  errorMessage={error.filter((e) => e.input === "cnpj")[0]?.msg}
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
                isInvalid={error.some((e) => e.input === "email")}
                errorMessage={error.filter((e) => e.input === "email")[0]?.msg}
              />

              <Input
                isRequired
                maxLength={15}
                labelPlacement="inside"
                label="Celular"
                value={phoneMask(cel)}
                onValueChange={(e: string) => setCel(e.replace(/\D/g, ""))}
                onBlur={validateCel}
                isInvalid={error.some((e) => e.input === "cel")}
                errorMessage={error.filter((e) => e.input === "cel")[0]?.msg}
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
          )}

          <Divider />

          <CardFooter className="buttons">
            <Button type="submit" color="success" variant="flat">
              Salvar
            </Button>
            <Button
              as={Link}
              to={"/consult-companies"}
              color="danger"
              variant="flat"
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </S.Container>
  );
}
