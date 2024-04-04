import { useState } from "react";

import { Card } from "../../../components/card";
import { FormGroup } from "../../../components/form-group";

import { useNavigate } from "react-router-dom";
import * as messages from "../../../components/toastr";
import { api } from "../../../services/api";

export function RegisterCompanies() {
  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  function submit() {
    const usuarioLogado = JSON.parse(localStorage.getItem("_usuario_logado")!);

    api
      .post("/api/empresas/salvar", { nome, usuario: usuarioLogado.id })
      .then(() => {
        navigate("/consult-companie");
        messages.mensagemSucesso("Empresa cadastrada com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  }

  return (
    <Card title="Cadastrar Empresa">
      <div className="row">
        <div className="col-md-6">
          <FormGroup id="inputNome" label="Nome: ">
            <input
              id="inputNome"
              type="text"
              className="form-control"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button onClick={submit} type="button" className="btn btn-success">
            Salvar
          </button>
          <button
            onClick={() => navigate("/consult-companie")}
            type="button"
            className="btn btn-danger"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Card>
  );
}
