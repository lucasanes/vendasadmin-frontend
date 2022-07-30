import React from "react";

import Card from '../components/card'
import FormGroup from "../components/form-group";

class Login extends React.Component{
    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log('Email', this.state.email)
        console.log('Senha', this.state.senha)
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className ="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email"/>
                                                </FormGroup>
                                                <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputPassword1" 
                                                    aria-describedby="Password" 
                                                    placeholder="Password"/>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                        
                                        <button onClick={this.entrar} type="button" className="btn btn-success">Entrar</button>
                                        <button type="button" className="btn btn-danger">Cadastrar</button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login