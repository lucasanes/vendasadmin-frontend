import React from "react"
import Card from '../../components/card'
import FormGroup from "../../components/form-group"
import {withRouter} from 'react-router-dom'
import LocalStorageService from "../../app/service/localstorageService"
import EmpresasTable from "./empresasTable"
import EmpresaService from '../../app/service/empresaService'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'
class ConsultaEmpresa extends React.Component{

    state = {
        nome: '',
        empresas: [],
        empresaExcluir: {}
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

    editar = (id) => {
        this.props.history.push(`/cadastro-empresa/${id}`)
        console.log('editando' + id);
    }

    abrirConfirmacao = (empresa) => {
        this.setState({showConfirmDialog: true, empresaExcluir: empresa})
    }

    excluir = (empresa) => {
        this.service
            .excluir(this.state.empresaExcluir.id)
            .then(response => {
                const empresas = this.state.empresas;
                const index = empresas.indexOf(empresa);
                empresas.splice(index, 1);
                this.setState({empresas: empresas, showConfirmDialog: false});
                messages.mensagemSucesso('Empresa excluída com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar excluir a empresa.')
            });
    }

    cancelarExcluir = () => {
        this.setState({showConfirmDialog: false, empresaExcluir: {}})
    }
    
    prepararFormularioCadastro = ()=> {
        this.props.history.push('/cadastro-empresa')
    }

    render(){

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.excluir} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarExcluir} />
            </div>
        );

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

                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button" 
                                            className="btn btn-success"
                                            onClick={this.buscar}>
                                        Buscar
                                    </button>
                                    <button type="button" 
                                            className="btn btn-success"
                                            onClick={this.prepararFormularioCadastro}>
                                        Cadastrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                
                <br />
                
                <div className="row">
                    <div className="col-md-12">
                        <EmpresasTable empresas={this.state.empresas}
                            editar={this.editar}
                            excluir={this.abrirConfirmacao}/>
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmar operação"
                        visible={this.state.showConfirmDialog}
                        style={{whidth: '50vw'}}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão da empresa?    
                    </Dialog>


                </div>
            </Card>
        )
    };
}

export default withRouter(ConsultaEmpresa)