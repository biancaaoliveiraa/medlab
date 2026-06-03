import "./LayoutAdmin.css";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import TopbarAdmin from "../TopbarAdmin/TopbarAdmin";

function LayoutAdmin({ children }) {
  return (
    <div className="layout-admin">
      <div className="conteudo-admin">
        <TopbarAdmin />

        <main>
          {children}
        </main>
      </div>

      <SidebarAdmin />
    </div>
  );
}

export default LayoutAdmin;