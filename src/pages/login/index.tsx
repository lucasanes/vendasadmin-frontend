import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/card";
import { FormGroup } from "../../components/form-group";
import { mensagemErro } from "../../components/toastr";
import { api } from "../../services/api";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function entrar() {
    api
      .post("/api/usuarios/autenticar", { email, senha })
      .then((response) => {
        localStorage.setItem("_usuario_logado", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((erro) => {
        console.log(erro);
        mensagemErro(erro.response.data);
      });
  }

  function prepareCadastrar() {
    navigate("/register-user");
  }

  return (
    <div className="row">
      <div className="col-md-6" style={{ position: "relative", left: "300px" }}>
        <div className="bs-docs-section">
          <Card title="Login">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <fieldset>
                    <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Digite o Email"
                      />
                    </FormGroup>
                    <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                      <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        aria-describedby="Password"
                        placeholder="Password"
                      />
                    </FormGroup>
                  </fieldset>
                </div>

                <button
                  onClick={entrar}
                  type="button"
                  className="btn btn-success"
                >
                  Entrar
                </button>
                <button
                  onClick={prepareCadastrar}
                  type="button"
                  className="btn btn-danger"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
