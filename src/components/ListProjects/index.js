import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AiFillCar } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";
import { FiPower } from "react-icons/fi";

import SideNav, {
  //Toggle,
  //Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import api from "../../services/api";

export default function ListProjects() {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpended] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function getListProjects() {
      const { data } = await api.get("projects");

      setProjects(data);
    }

    getListProjects();
  }, []);

  function handleLogout() {
    localStorage.clear();
    history.push("/login");
    window.location.reload(false);
  }

  return (
    <SideNav
      scroll
      style={{ background: "#6d121e", height: "1500px" }}
      onSelect={(selected) => {
        // Add your code here
      }}
      expanded={expanded}
      onToggle={(status) => setExpended(status)}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home" scroll>
          <NavIcon>
            <AiFillCar size={18} color="#fff" />
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Projetos</NavText>
          {projects.map((project) => {
            return (
              <NavItem
                eventKey="charts/linechart"
                onSelect={() => {
                  localStorage.setItem("projectName", project.name);
                  localStorage.setItem("projectId", project.id);
                  localStorage.setItem("projectTipo", project.tipo);
                  history.push("/");
                  setExpended(false);
                }}
                key={project.id}
              >
                <NavText>{project.name}</NavText>
              </NavItem>
            );
          })}
        </NavItem>

        <NavItem
          onSelect={() => {
            history.push("/cadastro");
          }}
        >
          <NavIcon>
            <MdLibraryAdd size={18} color="#fff" />
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Cadastrar Novo Projeto</NavText>
        </NavItem>

        <NavItem onSelect={handleLogout}>
          <NavIcon>
            <FiPower size={18} color="#E02041" />
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Sair</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
