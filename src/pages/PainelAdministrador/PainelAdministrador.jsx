import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import CardMenu from "../../components/CardMenu/CardMenu";

import {
  FaUsers,
  FaUserMd,
  FaHospital,
  FaChartBar
} from "react-icons/fa";

import "./PainelAdministrador.css";

function PainelAdministrador() {
  return (
    <LayoutAdmin>

      <div className="painel-admin">

        <h1>Painel Administrativo</h1>

        <p>
          Gerencie usuários, médicos, convênios e relatórios do sistema.
        </p>

        <div className="cards-admin">

          <CardMenu
            titulo="Usuários"
            descricao="Gerenciar pacientes cadastrados"
            icone={<FaUsers />}
            rota="/usuarios"
          />

          <CardMenu
            titulo="Médicos"
            descricao="Gerenciar médicos da clínica"
            icone={<FaUserMd />}
            rota="/medicos"
          />

          <CardMenu
            titulo="Convênios"
            descricao="Gerenciar convênios"
            icone={<FaHospital />}
            rota="/convenios"
          />

          <CardMenu
            titulo="Relatórios"
            descricao="Visualizar relatórios"
            icone={<FaChartBar />}
            rota="/relatorios"
          />

        </div>

      </div>

    </LayoutAdmin>
  );
}

export default PainelAdministrador;