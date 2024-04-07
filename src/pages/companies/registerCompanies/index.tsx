import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";
import * as S from "./styles";

export function RegisterCompanies() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { user } = useAuth();

  function submit() {
    api
      .post("/api/empresas/salvar", { nome: name, usuario: user?.id })
      .then(() => {
        navigate("/consult-companie");
        toast.success("Empresa cadastrada com sucesso!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  return (
    <S.Container>
      <Card className="card">
        <CardHeader>
          <h1 style={{ fontSize: 20 }}>Cadastrar Empresas</h1>
        </CardHeader>

        <CardBody>
          <Input
            labelPlacement="inside"
            label="Nome"
            value={name}
            onValueChange={setName}
          />

          <div className="buttons">
            <Button onPress={submit} color="success" variant="flat">
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
          </div>
        </CardBody>
      </Card>
    </S.Container>
  );
}
