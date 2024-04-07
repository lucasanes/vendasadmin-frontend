import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

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
}: {
  companies: Empresa[];
  edit: (id: number) => void;
  remove: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableColumn width={"75%"}>Nome</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {companies.map((empresa) => (
          <TableRow key={empresa.id}>
            <TableCell style={{ textTransform: "capitalize" }}>
              {empresa.nome}
            </TableCell>
            <TableCell style={{ display: "flex", gap: 20 }}>
              <Button
                color="success"
                variant="flat"
                onPress={() => edit(empresa.id)}
              >
                Editar
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={() => remove(empresa.id)}
              >
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
