import React from "react";

export default props =>  {

    const rows = props.empresas.map( empresa => {   
        return (
            <tr>
                <td>{empresa.nome}</td>
                <td></td>
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