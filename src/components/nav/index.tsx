import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const container = useRef(null);

  const [open, setOpen] = useState(false);

  function handleButtonClick() {
    setOpen(!open);
  }

  function handleClickOutside() {
    setOpen(false);
  }

  document.addEventListener("mousedown", handleClickOutside);

  return (
    <div className="bs-component" ref={container}>
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            SIGEVE WEB
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Usuários
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onMouseEnter={handleButtonClick}
                  onMouseLeave={handleButtonClick}
                >
                  Cadastros
                </button>
                <div
                  onMouseLeave={handleButtonClick}
                  className={open ? "dropdown-menu show" : "dropdown-menu"}
                >
                  <Link className="dropdown-item" to="/consult-companie">
                    Empresas
                  </Link>
                  <Link className="dropdown-item" to="/">
                    Fornecedores
                  </Link>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item" to="/">
                    Unidades
                  </Link>
                  <Link className="dropdown-item" to="/">
                    Produtos
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
