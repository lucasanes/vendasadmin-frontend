import {
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon } from "../../../../../assets/svg/DeleteIcon";
import { EditIcon } from "../../../../../assets/svg/EditIcon";
import * as S from "./styles";

interface Empresa {
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

export function TableCompanies({
  companies,
  edit,
  remove,
  isLoading,
}: {
  companies: Empresa[];
  edit: (id: number) => void;
  remove: (id: number) => void;
  isLoading: boolean;
}) {
  return (
    <S.Container>
      <TableHeader>
        <TableColumn width={"90%"} className="nameColumn">
          Nome
        </TableColumn>
        <TableColumn className="buttonsColumn">Ações</TableColumn>
      </TableHeader>
      <TableBody
        style={{
          height: isLoading ? "60px" : "auto",
        }}
        items={companies}
        isLoading={isLoading}
        loadingContent={<Spinner style={{ marginTop: 50 }} />}
      >
        {(empresa) => (
          <TableRow key={empresa.id}>
            <TableCell className="nameCell">{empresa.nome}</TableCell>

            <TableCell className="buttonsCell">
              <Tooltip color="success" content="Editar">
                <span
                  onClick={() => edit(empresa.id)}
                  className="text-success cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Deletar">
                <span
                  onClick={() => remove(empresa.id)}
                  className="text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </S.Container>
  );
}
