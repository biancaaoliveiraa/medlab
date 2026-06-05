import "./LayoutAdmin.css";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import TopbarAdmin from "../TopbarAdmin/TopbarAdmin";

function LayoutAdmin({ children, mostrarMenu = true, setCurrentScreen }) {
  return (
    <div className="layout-admin">
      <TopbarAdmin setCurrentScreen={setCurrentScreen} />

      <div className="conteudo-admin">
        <main>{children}</main>
      </div>

      {mostrarMenu && <SidebarAdmin setCurrentScreen={setCurrentScreen} />}
    </div>
  );
}

export default LayoutAdmin;