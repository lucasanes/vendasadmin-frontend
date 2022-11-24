import React from "react"
import Card from '../../components/card'
import FormGroup from "../../components/form-group"
import {withRouter} from 'react-router-dom'
import EmpresasTable from "./empresasTable"
import LocalStorageService from "../../app/service/localStorageService"
import EmpresaService from '../../app/service/empresaService'

class ConsultaEmpresa extends React.Component{

    state = {
        nome: '',
        empresas: []
    }

    constructor(){
        super();
        this.service = new EmpresaService();
    }

    buscar = () => 
    {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const consultaEmpresaFiltro = {
            nome: this.state.nome,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(consultaEmpresaFiltro)
            .then( resposta => {
                this.setState({ empresas: resposta.data })
            }).catch( error => {
                console.log(error)
            })
    }

    render(){

        return (
            <Card title="Consulta Empresas">
                <div className="row">
                    <div className="col-md-12">
                        <div className ="bs-component">
                            <FormGroup label="Nome: " htmlFor="inputNome">
                                <input type="text" 
                                    id="inputNome" 
                                    className="form-control"
                                    value={this.state.nome}
                                    onChange={e => this.setState({nome: e.target.value})}
                                    placeholder="Digite o Nome" />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>  
                
                <br />
                
                <div className="row">
                    <div className="col-md-12">
                        <EmpresasTable empresas={this.state.empresas} />
                    </div>
                </div>
            </Card>
        )
    };
}

export default withRouter(ConsultaEmpresa)