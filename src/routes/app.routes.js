import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Cadastro from "../pages/Cadastro";
import Registros from "../pages/Registros";
import NewRegistro from "../pages/NewRegistro";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Registros} />
        <Route path="/cadastro" exact component={Cadastro} />
        <Route path="/register/new" exact component={NewRegistro} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
