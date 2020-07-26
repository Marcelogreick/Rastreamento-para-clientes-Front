import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import api from "../../services/api";

import "./styles.css";

import logo from "../../assets/logofb.png";
import ListProjects from "../../components/ListProjects";

export default function Registros() {
  const [records, setRecords] = useState([]);

  const projectName = localStorage.getItem("projectName");
  const projectId = localStorage.getItem("projectId");
  const projectTipo = localStorage.getItem("projectTipo");

  const History = useHistory();

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: projectId,
        },
      })
      .then((res) => {
        setRecords(res.data);
      });
  }, [projectId]);

  function verificarProjeto() {
    if (!projectId) {
      Swal.fire({
        icon: "error",
        title: "Selecione um Projeto",
        text: "",
        footer: "",
      });
    } else {
      History.push("/register/new");
    }
  }

  async function handleDeleteRegister(id) {
    try {
      await api.delete(`records/${id}`, {
        headers: {
          Authorization: projectId,
        },
      });

      setRecords(records.filter((records) => records.id !== id));
    } catch (err) {
      alert("Error ao deletar caso, tente novamente");
    }
  }

  return (
    <div className="registro-container">
      <header>
        <img src={logo} alt="fb704" />
        <span>
          Projeto: {projectName} - {projectTipo} - {projectId}
        </span>

        <Link className="button" onClick={verificarProjeto}>
          Criar Registro
        </Link>
      </header>

      <h1>Registros Cadastrados</h1>
      <ListProjects />
      <ul>
        {records.map((register) => (
          <li key={register.id}>
            <strong>Status:</strong>
            <p>{register.status}</p>

            <strong>Data:</strong>
            <p>{new Date(register.data_register).toLocaleDateString()}</p>

            <strong>Descrição:</strong>
            <p>{register.description}</p>

            <button
              onClick={() => handleDeleteRegister(register.id)}
              type="button"
            >
              <FiTrash2 size="18" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
