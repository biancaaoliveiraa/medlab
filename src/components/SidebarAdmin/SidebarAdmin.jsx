import "./SidebarAdmin.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserMd,
  FaHospital,
  FaChartBar
} from "react-icons/fa";

function SidebarAdmin() {
  return (
    <footer className="bottom-nav">

      <Link to="/admin">
        <FaHome />
        <span>Home</span>
      </Link>

      <Link to="/usuarios">
        <FaUsers />
        <span>Usuários</span>
      </Link>

      <Link to="/medicos">
        <FaUserMd />
        <span>Médicos</span>
      </Link>

      <Link to="/convenios">
        <FaHospital />
        <span>Convênios</span>
      </Link>

      <Link to="/relatorios">
        <FaChartBar />
        <span>Relatórios</span>
      </Link>

    </footer>
  );
}

export default SidebarAdmin;