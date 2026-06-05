import "./SidebarAdmin.css";
import {
  FaHome,
  FaUsers,
  FaUserMd,
  FaHospital,
  FaChartBar
} from "react-icons/fa";

function SidebarAdmin({ setCurrentScreen }) {
  return (
    <footer className="bottom-nav">
      <button type="button" onClick={() => setCurrentScreen("painel-administrador")}>
        <FaHome />
        <span>Home</span>
      </button>

      <button type="button" onClick={() => setCurrentScreen("usuarios")}>
        <FaUsers />
        <span>Usuários</span>
      </button>

      <button type="button" onClick={() => setCurrentScreen("medicos")}>
        <FaUserMd />
        <span>Médicos</span>
      </button>

      <button type="button" onClick={() => setCurrentScreen("convenios")}>
        <FaHospital />
        <span>Convênios</span>
      </button>

      <button type="button" onClick={() => setCurrentScreen("relatorios")}>
        <FaChartBar />
        <span>Relatórios</span>
      </button>
    </footer>
  );
}

export default SidebarAdmin;