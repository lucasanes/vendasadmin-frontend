import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Card } from "../../components/card";
import { FormGroup } from "../../components/form-group";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";
import { api } from "../../services/api";

export function User() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepeticao, setSenhaRepeticao] = useState("");

  const navigate = useNavigate();

  function validar() {
    const msgs = [];

    if (nome) {
      msgs.push("O campo Nome é obrigatório.");
    }

    if (email) {
      msgs.push("O campo Email é obrigatório.");
    } else if (email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      msgs.push("Informe um Email válido.");
    }

    if (!senha || !senhaRepeticao) {
      msgs.push("Digite a Senha 2x.");
    } else if (senha !== senhaRepeticao) {
      msgs.push("As Senhas informadas são diferentes.");
    }

    return msgs;
  }

  function cadastrar() {
    const msgs = validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg) => {
        mensagemErro(msg);
      });
      return false;
    }

    api
      .post("/api/usuarios/salvar", {
        nome,
        email,
        senha,
      })
      .then(() => {
        mensagemSucesso(
          "Usuário cadastrado com sucesso! Faça o login para acessar o sistema."
        );
        navigate("/login");
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });
  }

  function cancelar() {
    navigate("/login");
  }

  return (
    <Card title="Cadastro de Usuário">
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            <FormGroup label="Nome: *" htmlFor="inputNome">
              <input
                type="text"
                id="inputNome"
                className="form-control"
                name="nome"
                onChange={(e) => setNome(e.target.value)}
              />
            </FormGroup>
            <FormGroup label="Email: *" htmlFor="inputEmail">
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup label="Senha: *" htmlFor="inputSenha">
              <input
                type="password"
                id="inputSenha"
                className="form-control"
                name="senha"
                onChange={(e) => setSenha(e.target.value)}
              />
            </FormGroup>
            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
              <input
                type="password"
                id="inputRepitaSenha"
                className="form-control"
                name="senha"
                onChange={(e) => setSenhaRepeticao(e.target.value)}
              />
            </FormGroup>
            <button
              onClick={cadastrar}
              type="button"
              className="btn btn-success"
            >
              Salvar
            </button>
            <button onClick={cancelar} type="button" className="btn btn-danger">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
