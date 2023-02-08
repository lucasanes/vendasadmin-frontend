import React from "react"

import Card from '../../components/card'
import FormGroup from "../../components/form-group"

import {withRouter} from 'react-router-dom'
import * as messages from '../../components/toastr'

import EmpresaService from '../../app/service/empresaService'
import LocalStorageService from "../../app/service/localstorageService"

class CadastroEmpresa extends React.Component{
    
    state = {
        id: null,
        nome: ''
    }

    constructor(){
        super();
        this.service = new EmpresaService();
    }

    componentDidMount(){
        const params = this.props.match.params
        console.log('params: ', params)
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const {nome} = this.state;
        const empresa = {nome, usuario: usuarioLogado.id};

        this.service
            .salvar(empresa)
            .then(response => {
                this.props.history.push('/consulta-empresa')
                messages.mensagemSucesso('Empresa cadastrada com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value})
    }

    render(){

        return (
            <Card title="Cadastrar Empresa">
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputNome" label="Nome: ">
                            <input id="inputNome" type="text"
                                className="form-control"
                                name="nome"
                                value={this.state.nome}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.submit} type="button" className="btn btn-success">Salvar</button>
                        <button onClick={e => this.props.history.push('/consulta-empresa')} type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )

    }

}

export default withRouter(CadastroEmpresa)