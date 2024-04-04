import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/card";
import { FormGroup } from "../../../components/form-group";
import * as messages from "../../../components/toastr";
import { api } from "../../../services/api";
import { TableCompanies } from "./components/tableCompanies";

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

export function ConsultCompanies() {
  const [nome, setNome] = useState("");
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaExcluir, setEmpresaExcluir] = useState<Empresa | null>(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const navigate = useNavigate();

  function buscar() {
    api
      .get(`/api/empresas/?nome=${nome}`)
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function editar(id: number) {
    navigate(`/register-companie/${id}`);
  }

  function abrirConfirmacao(empresa: Empresa) {
    setEmpresaExcluir(empresa);
    setShowConfirmDialog(true);
  }

  function excluir() {
    api
      .delete(`/api/empresas/${empresaExcluir?.id}`)
      .then(() => {
        const newEmpresas = empresas.filter(
          (empresa) => empresa.id != empresaExcluir?.id
        );
        setEmpresas(newEmpresas);
        setShowConfirmDialog(false);
        messages.mensagemSucesso("Empresa excluída com sucesso!");
      })
      .catch(() => {
        messages.mensagemErro("Ocorreu um erro ao tentar excluir a empresa.");
      });
  }

  function cancelarExcluir() {
    setEmpresaExcluir(null);
    setShowConfirmDialog(false);
  }

  function prepararFormularioCadastro() {
    navigate("/register-companie");
  }

  const confirmDialogFooter = (
    <div>
      <Button label="Confirmar" icon="pi pi-check" onClick={excluir} />
      <Button label="Cancelar" icon="pi pi-times" onClick={cancelarExcluir} />
    </div>
  );

  return (
    <Card title="Consulta Empresas">
      <div className="row">
        <div className="col-md-12">
          <div className="bs-component">
            <FormGroup label="Nome: " htmlFor="inputNome">
              <input
                type="text"
                id="inputNome"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o Nome"
              />
            </FormGroup>

            <div className="row">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={buscar}
                >
                  Buscar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={prepararFormularioCadastro}
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-md-12">
          <TableCompanies
            empresas={empresas}
            editar={editar}
            excluir={abrirConfirmacao}
          />
        </div>
      </div>

      <div>
        <Dialog
          header="Confirmar operação"
          visible={showConfirmDialog}
          style={{ width: "50vw" }}
          footer={confirmDialogFooter}
          modal={true}
          onHide={() => setShowConfirmDialog(false)}
        >
          Confirma a exclusão da empresa?
        </Dialog>
      </div>
    </Card>
  );
}
