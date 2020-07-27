import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { format, compareAsc } from "date-fns";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

//import ReactTextCollapse from 'react-text-collapse'

import logo from "../../assets/logofb.png";

import api from "../../services/api";

import { IoIosApps } from "react-icons/io";
import { AiFillEnvironment } from "react-icons/ai";
import { FiPower } from "react-icons/fi";

import "./styles.css";
import { ptBR } from "date-fns/locale";

//const TEXT_COLLAPSE_OPTIONS = {
// collapse: false,
// collapseText: 'Mostrar mais',
// expandText: 'Mostrar menos',
// minHeight: 60,
//maxHeight: 700,
//textStyle: {
// color: ,
//fontSize: '12px'
//}
//}

export default function Consulta() {
  const [records, setRecords] = useState([]);

  const history = useHistory();

  const projectName = localStorage.getItem("projectName");
  const projectId = localStorage.getItem("projectId");
  const projectDataEntrada = localStorage.getItem("projectDataEntrada");

  useEffect(() => {
    if (!projectId) {
      history.push("/");
    }

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

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <VerticalTimeline>
      <header>
        <img src={logo} alt="fb704" />
        <span>
          {projectName}
          <br />
          {projectId}
        </span>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <VerticalTimelineElement
        className="Inicio"
        contentStyle={{ background: "#6d121e", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #6d121e" }}
        iconStyle={{ background: "#6d121e", color: "#fff" }}
        icon={<AiFillEnvironment />}
      >
        <h3 className="Status">Validação de informações</h3>
        <h4 className="Data">
          {new Date(projectDataEntrada).toLocaleDateString()}
        </h4>
        <p>
          Olá, nessa etapa nós iremos validar as informações preenchidas no
          formulário enviado. Entraremos em contato com você, para conclusão
          dessa etapa!
        </p>
      </VerticalTimelineElement>

      <ul>
        {records.map((register) => (
          <VerticalTimelineElement
            key={register.id}
            className="registro"
            iconStyle={{ background: "#d1d1d1", color: "#6d121e" }}
            icon={<IoIosApps />}
          >
            <h3 className="Status">{register.status}</h3>
            <h4 className="Data">
              {new Date(register.data_register).toLocaleDateString()}
            </h4>
            <p>{register.description}</p>
          </VerticalTimelineElement>
        ))}
      </ul>
    </VerticalTimeline>
  );
}
