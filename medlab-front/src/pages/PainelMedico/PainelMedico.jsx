import { useState } from "react";
import { FaHome, FaCalendarAlt, FaFlask, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logoMedLab from "../../assets/images/logo-medlab.png";
import Dashboard from "../../components/Dashboard";
import Atendimentos from "../../components/Atendimentos";
import Exames from "../../components/Exames";
import "./PainelMedico.css";

function PainelMedico({ medicoLogado, setCurrentScreen }) {
  const [abaAtiva, setAbaAtiva] = useState("dashboard");

  function renderConteudo() {
    if (abaAtiva === "dashboard") return <Dashboard medicoLogado={medicoLogado} />;
    if (abaAtiva === "atendimentos") return <Atendimentos medicoLogado={medicoLogado} />;
    if (abaAtiva === "exames") return <Exames medicoLogado={medicoLogado} />;
    return null;
  }

  return (
    <div className="layout-medico">
      {/* Topbar */}
      <header className="topbar-medico">
        <div className="logo-container">
          <img src={logoMedLab} alt="MedLab" className="logo-medlab" />
        </div>
        <div className="perfil-medico">
          <div className="usuario-medico">
            <FaUserCircle />
            <span>{medicoLogado?.nome || "Médico"}</span>
          </div>
          <button className="logout-btn" title="Sair" onClick={() => setCurrentScreen("landing")}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="conteudo-medico">
        <main>{renderConteudo()}</main>
      </div>

      {/* Bottom navigation */}
      <nav className="bottom-nav-medico">
        <button
          className={abaAtiva === "dashboard" ? "ativo" : ""}
          onClick={() => setAbaAtiva("dashboard")}
        >
          <FaHome />
          <span>Home</span>
        </button>

        <button
          className={abaAtiva === "atendimentos" ? "ativo" : ""}
          onClick={() => setAbaAtiva("atendimentos")}
        >
          <FaCalendarAlt />
          <span>Atendimentos</span>
        </button>

        <button
          className={abaAtiva === "exames" ? "ativo" : ""}
          onClick={() => setAbaAtiva("exames")}
        >
          <FaFlask />
          <span>Exames</span>
        </button>
      </nav>
    </div>
  );
}

export default PainelMedico;
