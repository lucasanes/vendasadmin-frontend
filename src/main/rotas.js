import React from 'react'

import Home from '../views/home.js'
import Login from '../views/login.js'
import Usuario from '../views/usuario.js'
import ConsultaEmpresa from '../views/empresas/consultaEmpresa.js'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={Usuario} />
                <Route path="/consulta-empresa" component={ConsultaEmpresa} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas