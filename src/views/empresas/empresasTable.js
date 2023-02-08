import React from "react";

export default props =>  {

    const rows = props.empresas.map( empresa => {   
        return (
            <tr key={empresa.id}>
                <td>{empresa.nome}</td>
                <td>
                    <button type="button" 
                            className="btn btn-success"
                            onClick={e => props.editar(empresa.id)}>
                        Editar
                    </button>
                    <button type="button" 
                            className="btn btn-danger"
                            onClick={e => props.excluir(empresa)}>
                        Excluir
                    </button>
                </td>
            </tr>
        ) 
    } )

    return (
        <table className="table table-hover">
           <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                </tr>

           </thead>
           <tbody>
                {rows}
           </tbody>

        </table>

    )
}