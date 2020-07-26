import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import api from "../../services/api";

import logoImg from "../../assets/logofb.png";
import "./styles.css";
import { useAuth } from "../../contexts/auth";

export default function LoginAdm() {
  const { authenticate } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await api.post("login", { email, senha });
      authenticate(data);
      history.push("/");
      window.location.reload(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Usuário ou Senha inválido",
        text: "",
        footer: "",
      });
    }
  }

  return (
    <sec className="loginadm-container">
      <img src={logoImg} alt="logo" />

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="button" type="submit">
          Fazer Login
        </button>
      </form>
    </sec>
  );
}
