/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalDelete } from "../../../components/modalDelete";
import { api } from "../../../services/api";
import { TableCompanies } from "./components/tableCompanies";
import * as S from "./styles";

interface Company {
  id: number;
  nome: string;
  cpf_cnpj: string;
  inscricao: string;
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  telefone: string;
  email: string;
  observacao: string;
  codigo_ref: string;
  data_cadastro: Date;
  id_usuario: number;
  proximo_numero_nota: number;
}

export function ConsultCompanies() {
  useAsyncList({
    async load({ signal }) {
      const res = await api.get(`/api/empresas/?nome`, {
        signal,
      });
      setTimeout(() => {
        setIsLoading(false);
        setCompanies(res.data);
      }, 1000);

      return { items: res.data };
    },
  });

  const [name, setName] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyDeleteId, setCompanyDeleteId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const navigate = useNavigate();

  function search(e: FormEvent) {
    e.preventDefault();

    api
      .get(`/api/empresas/?nome=${name}`)
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function edit(id: number) {
    navigate(`/register-companie/${id}`);
  }

  function openModalDelete(id: number) {
    setCompanyDeleteId(id);
    onOpen();
  }

  function remove() {
    api
      .delete(`/api/empresas/${companyDeleteId}`)
      .then(() => {
        const newCompanies = companies.filter(
          (company) => company.id != companyDeleteId
        );
        setCompanies(newCompanies);
        onClose();
        toast.success("Empresa excluída com sucesso!");
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao tentar excluir a empresa.");
      });
  }

  function cancelDelete() {
    setCompanyDeleteId(null);
    onClose();
  }

  return (
    <>
      <S.Container>
        <Card className="card">
          <CardHeader>
            <h1 style={{ fontSize: 20 }}>Consulta Empresas</h1>
          </CardHeader>

          <Divider />

          <CardBody>
            <form onSubmit={search}>
              <Input
                labelPlacement="inside"
                label="Nome"
                value={name}
                onValueChange={setName}
              />

              <div className="buttons">
                <Button type="submit" color="success" variant="flat">
                  Buscar
                </Button>
                <Button
                  as={Link}
                  to={"/register-companie"}
                  color="danger"
                  variant="flat"
                >
                  Cadastrar
                </Button>
              </div>
            </form>

            <TableCompanies
              companies={companies}
              edit={edit}
              remove={openModalDelete}
              isLoading={isLoading}
            />
          </CardBody>
        </Card>
      </S.Container>

      <ModalDelete
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        cancel={cancelDelete}
        confirm={remove}
      />
    </>
  );
}
