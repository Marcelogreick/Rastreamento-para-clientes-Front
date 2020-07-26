import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logofb.png";
import fabricaImg from "../../assets/logo2.png";

function Alerta() {
  Swal.fire({
    icon: 'info',
    title: 'Não recebeu código?',
    text: 'Entre em contato com o suporte de novos aplicativos',
  })
}

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("sessions", { id });

      localStorage.setItem("projectId", id);
      localStorage.setItem("projectName", res.data.name);
      localStorage.setItem("projectTipo", res.data.tipo);
      localStorage.setItem("projectDataEntrada", res.data.data_entrada);

      history.push("/consulta");

      console.log(res.data.data_entrada);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Código inválido ou inativo',
        text: 'Entre em contato com o suporte',
        footer: ''
      })
    }
  }

  return (
    <div className="login-container">
      <sec className="form">
        <img src={logoImg} alt="logo" />

        <form onSubmit={handleLogin}>
          <h1>Faça sua consulta</h1>

          <input
            placeholder="Digite seu código aqui"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Consultar
          </button>

          <Link className="back-link" href="#" onClick={Alerta}>
            <FiLogIn size={16} color="#000" />
            Não tenho código
          </Link>
        </form>
      </sec>

      <img className="banner" src={fabricaImg} alt="fabrica" />
    </div>
  );
}
