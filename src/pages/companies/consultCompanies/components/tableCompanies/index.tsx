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
  empresas,
  editar,
  excluir,
}: {
  empresas: Empresa[];
  editar: (id: number) => void;
  excluir: (empresa: Empresa) => void;
}) {
  const rows = empresas.map((empresa) => {
    return (
      <tr key={empresa.id}>
        <td>{empresa.nome}</td>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => editar(empresa.id)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => excluir(empresa)}
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
