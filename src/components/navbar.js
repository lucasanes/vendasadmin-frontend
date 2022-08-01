import React from "react"

class Navbar extends React.Component{
   state = {
        open: false
    };
    
    handleButtonClick = () => {
        this.setState(state => {
            return {
            open: !state.open
            };
        });
    };

    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)){
            this.setState({
            open: false
            });
        }
    };

    render(){
        return (
            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div className="container">
                    <a href="#/home" className="navbar-brand">SIGEVE WEB</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/cadastro-usuarios">Usuários</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" onClick={this.handleButtonClick} href="#">Cadastros</a>
                            <div className={this.state.open ? "dropdown-menu show" : "dropdown-menu"}>
                                <a className="dropdown-item" href="#">Empresas</a>
                                <a className="dropdown-item" href="#">Fornecedores</a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="#">Unidades</a>
                                <a className="dropdown-item" href="#">Produtos</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/login">Login</a>
                        </li>
                    </ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar