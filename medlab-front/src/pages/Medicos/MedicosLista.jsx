import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaExclamationTriangle
} from "react-icons/fa";
import api from "../../services/api";

import "./MedicosLista.css";

function MedicosLista({ setCurrentScreen, setAdminItemId }) {
  const [medicos, setMedicos] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);

  useEffect(() => {
    buscarMedicos();
  }, []);

  async function buscarMedicos() {
    try {
      const resposta = await api.get("/medicos");
      const medicosOrdenados = resposta.data.sort((a, b) => a.id - b.id);
      setMedicos(medicosOrdenados);
    } catch (erro) {
      console.log("Erro ao buscar médicos:", erro);
    }
  }

  const sugestoes = medicos.filter((medico) =>
    medico.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirCadastro() {
    setCurrentScreen("medicos-cadastro");
  }

  function abrirEditor(id) {
    setAdminItemId(id);
    setCurrentScreen("medicos-editar");
  }

  function abrirModalExclusao(medico) {
    setMedicoSelecionado(medico);
    setModalAberto(true);
  }

  function fecharModalExclusao() {
    setMedicoSelecionado(null);
    setModalAberto(false);
  }

  async function confirmarExclusao() {
    if (!medicoSelecionado) {
      return;
    }

    try {
      await api.delete(`/medicos/${medicoSelecionado.id}`);
      fecharModalExclusao();
      buscarMedicos();
    } catch (erro) {
      console.log("Erro ao excluir médico:", erro);
    }
  }

  async function alterarStatus(medico) {
    try {
      const medicoAtualizado = {
        ...medico,
        status: !medico.status
      };

      await api.put(`/medicos/${medico.id}`, medicoAtualizado);
      buscarMedicos();
    } catch (erro) {
      console.log("Erro ao alterar status:", erro);
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="medicos-container">
        <div className="medicos-header">
          <h1>Gerenciador de Médicos</h1>
        </div>

        <div className="busca-medicos">
          <div className="campo-busca-medico">
            <input
              type="text"
              placeholder="Buscar médico..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            {busca && (
              <div className="lista-sugestoes-medico">
                {sugestoes.map((medico) => (
                  <button
                    key={medico.id}
                    type="button"
                    className="item-sugestao-medico"
                    onClick={() => abrirEditor(medico.id)}
                  >
                    <strong>{medico.nome}</strong>
                    <span>{medico.especialidade}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tabela-medicos">
          <div className="titulo-listagem">
            <h2>Listagem Geral</h2>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Especialização</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {medicos.map((medico) => (
                <tr key={medico.id}>
                  <td>{medico.nome}</td>
                  <td>{medico.especialidade}</td>

                  <td>
                    <label className="switch-medico">
                      <input
                        type="checkbox"
                        checked={medico.status}
                        onChange={() => alterarStatus(medico)}
                      />
                      <span className="slider-medico"></span>
                    </label>
                  </td>

                  <td className="acoes-medico">
                    <button
                      type="button"
                      className="editar-medico"
                      onClick={() => abrirEditor(medico.id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="excluir-medico"
                      onClick={() => abrirModalExclusao(medico)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            className="botao-adicionar-medico"
            onClick={abrirCadastro}
          >
            <FaPlus />
            Adicionar médico
          </button>
        </div>

        {modalAberto && (
          <div className="modal-medico-fundo">
            <div className="modal-medico-exclusao">
              <div className="modal-medico-icone">
                <FaExclamationTriangle />
              </div>

              <h2>Confirmar exclusão</h2>

              <p>
                Tem certeza que deseja excluir o médico{" "}
                <strong>{medicoSelecionado?.nome}</strong>?
              </p>

              <span>Esta ação não poderá ser desfeita.</span>

              <div className="modal-medico-acoes">
                <button
                  type="button"
                  className="modal-medico-cancelar"
                  onClick={fecharModalExclusao}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="modal-medico-confirmar"
                  onClick={confirmarExclusao}
                >
                  Excluir médico
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}

export default MedicosLista;