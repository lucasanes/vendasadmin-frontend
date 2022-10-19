import React from "react"

import Card from '../components/card'
import FormGroup from "../components/form-group"
import {withRouter} from 'react-router-dom'

class ConsultaEmpresa extends React.Component{

    render(){

        const empresas = [
            {id: 1, nome: 'Fazenda Vale Verde', cpfCnpj: '00.000.000/0000-00', proximoNumeroNota: 1}
        ]

        return (
            <Card title="Consulta Empresas">
                <div className="row">
                    <div className="col-md-12">
                        <div className ="bs-component">
                            <FormGroup label="Nome: " htmlFor="inputNome">
                                <input type="text" 
                                    id="inputNome" 
                                    className="form-control"
                                    placeholder="Digite o Nome" />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>  
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaEmpresa)