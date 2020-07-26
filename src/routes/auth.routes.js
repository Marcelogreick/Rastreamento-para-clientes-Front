import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Consulta from "../pages/Consultas";
import LoginAdm from "../pages/LoginAdm";
import NotFound from "../pages/NotFound";

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/consulta" component={Consulta} />
        <Route path="/login" component={LoginAdm} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
