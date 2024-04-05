import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Bem vindo!</h1>
      <p className="lead">Esse é seu Sistema de Gerenciamento de Vendas.</p>
      <hr className="my-4" />
      <p>
        E essa é sua área administrativa, utilize um dos menus ou botões abaixo
        para navegar pelo sistema.
      </p>
      <p className="lead">
        <Link className="btn btn-primary btn-lg" to="/register" role="button">
          <i className="fa fa-users"></i> Cadastrar Usuário
        </Link>
        <Link
          className="btn btn-danger btn-lg"
          to="/register-companie"
          role="button"
        >
          <i className="fa fa-users"></i> Cadastrar Nota Fiscal
        </Link>
      </p>
    </div>
  );
}
