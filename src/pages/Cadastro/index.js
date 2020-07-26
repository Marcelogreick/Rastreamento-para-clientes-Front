import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import api from "../../services/api";
import "./styles.css";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [data_entrada, setData] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();

  async function handleCadastro(e) {
    e.preventDefault();

    const dados = {
      name,
      tipo,
      data_entrada,
      email,
      phone,
    };

    try {
      const res = await api.post("projects", dados);

      Swal.fire({
        icon: "success",
        title: "Código do aplicativo",
        text: `${res.data.id}`,
      });

      history.push("/");
    } catch (err) {
      alert("Erro no Cadastro");
    }
  }
  return (
    <div className="cadastro-container">
      <div className="content">
        <form onSubmit={handleCadastro}>
          <h1>Cadastro</h1>

          <input
            placeholder="Nome do Projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Telefone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="date"
            id="entrada"
            style={{ width: 300 }}
            value={data_entrada}
            onChange={(e) => setData(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>

          <Link id="Link" className="back-link" to="/">
            <FiArrowLeft size={16} color="#000" />
            Voltar
          </Link>
        </form>
      </div>
    </div>
  );
}
