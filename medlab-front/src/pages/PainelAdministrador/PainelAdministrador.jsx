import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import CardMenu from "../../components/CardMenu/CardMenu";
import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaUsers,
  FaUserMd,
  FaHospital,
  FaChartBar
} from "react-icons/fa";
import "./PainelAdministrador.css";

function PainelAdministrador({ setCurrentScreen }) {
  const [dados, setDados] = useState({
    usuarios: 0,
    medicos: 0,
    convenios: 0,
    relatorios: 0
  });

  useEffect(() => {
    buscarDadosDashboard();
  }, []);

  async function buscarDadosDashboard() {
    try {
      const resposta = await api.get("/dashboard");
      setDados(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar dados do dashboard:", erro);
    }
  }

  return (
    <LayoutAdmin mostrarMenu={false} setCurrentScreen={setCurrentScreen}>
      <div className="painel-admin">
        <h1>Painel Administrativo</h1>

        <p>Gerencie usuários, médicos, convênios e relatórios do sistema.</p>

        <div className="cards-admin">
          <CardMenu
            titulo="Usuários"
            descricao={`${dados.usuarios} usuários cadastrados`}
            icone={<FaUsers />}
            tela="usuarios"
            setCurrentScreen={setCurrentScreen}
          />

          <CardMenu
            titulo="Médicos"
            descricao={`${dados.medicos} médicos cadastrados`}
            icone={<FaUserMd />}
            tela="medicos"
            setCurrentScreen={setCurrentScreen}
          />

          <CardMenu
            titulo="Convênios"
            descricao={`${dados.convenios} convênios cadastrados`}
            icone={<FaHospital />}
            tela="convenios"
            setCurrentScreen={setCurrentScreen}
          />

          <CardMenu
            titulo="Relatórios"
            descricao={`${dados.relatorios} relatórios disponíveis`}
            icone={<FaChartBar />}
            tela="relatorios"
            setCurrentScreen={setCurrentScreen}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default PainelAdministrador;