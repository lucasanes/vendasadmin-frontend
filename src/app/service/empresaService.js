import ApiService from "../apiservice";

export default class EmpresaService extends ApiService {
    constructor(){
        super('/api/empresas')
    }

    consultar(consultaEmpresaFiltro){
        let params = `?nome=${consultaEmpresaFiltro.nome}`

        //if (consultaEmpresaFiltro.usuario){
        //    params = `?usuario=${consultaEmpresaFiltro.usuario}`
        //}

        return this.get(params);
    }

}