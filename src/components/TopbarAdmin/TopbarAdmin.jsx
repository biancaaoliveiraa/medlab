import "./TopbarAdmin.css";
import logoMedLab from "../../assets/images/logo-medlab.png";
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TopbarAdmin() {
  const navigate = useNavigate();
  const [notificacoesAberta, setNotificacoesAberta] = useState(false);

  const notificacoes = [
    {
      id: 1,
      titulo: "Novo agendamento",
      descricao: "João Silva agendou uma consulta com Dr. Ricardo.",
      horario: "09:30"
    },
    {
      id: 2,
      titulo: "Convênio atualizado",
      descricao: "Bradesco Saúde teve suas informações alteradas.",
      horario: "10:15"
    },
    {
      id: 3,
      titulo: "Médico cadastrado",
      descricao: "Dra. Camila Torres foi adicionada ao sistema.",
      horario: "11:40"
    }
  ];

  function fazerLogout() {
    navigate("/");
  }

  function alternarNotificacoes() {
    setNotificacoesAberta(!notificacoesAberta);
  }

  return (
    <header className="topbar-admin">
      <div className="logo-container">
        <img
          src={logoMedLab}
          alt="MedLab"
          className="logo-medlab"
        />
      </div>

      <div className="perfil-admin">
        <div className="area-notificacao">
          <button
            type="button"
            className="botao-notificacao"
            onClick={alternarNotificacoes}
          >
            <FaBell />
            <span></span>
          </button>

          {notificacoesAberta && (
            <div className="popup-notificacoes">
              <h3>Notificações</h3>

              {notificacoes.map((notificacao) => (
                <div className="item-notificacao" key={notificacao.id}>
                  <div>
                    <strong>{notificacao.titulo}</strong>
                    <p>{notificacao.descricao}</p>
                  </div>

                  <span>{notificacao.horario}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="usuario">
          <FaUserCircle />
          <span>Administrador</span>
        </div>

        <button
          className="logout-btn"
          onClick={fazerLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
}

export default TopbarAdmin;