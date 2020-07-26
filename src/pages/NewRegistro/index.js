import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function NewRegistro() {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [data_register, setData_register] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    async function getSteps() {
      const { data } = await api.get("/steps");
      setSteps(data);
    }

    getSteps();
  }, []);

  const History = useHistory();

  const projectId = localStorage.getItem("projectId");

  async function HandleNewRegister(e) {
    e.preventDefault();

    const data = {
      status,
      description,
      data_register,
    };

    try {
      await api.post("records", data, {
        headers: {
          Authorization: projectId,
        },
      });

      History.push("/");
    } catch (err) {
      alert("Erro ao cadastrar caso, tente novamente");
    }
  }

  return (
    <div className="newregister-container">
      <div className="content">
        <form onSubmit={HandleNewRegister}>
          <h1>Cadastro</h1>

          <select
            onChange={(e) => {
              const step = JSON.parse(e.target.value);
              setStatus(step.title);
              setDescription(step.description);
            }}
          >
            <option>Selecione</option>
            {steps.map((step) => {
              return (
                <option key={step.id} value={JSON.stringify(step)}>
                  {step.title}
                </option>
              );
            })}
          </select>
          <input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            id="data"
            style={{ width: 300 }}
            value={data_register}
            onChange={(e) => setData_register(e.target.value)}
          />

          <button className="button" type="submit">
            Casdastrar
          </button>
          <section>
            <Link id="Link" className="back-link" to="/">
              <FiArrowLeft size={16} color="#000" />
              Voltar
            </Link>
          </section>
        </form>
      </div>
    </div>
  );
}
