import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import api from "../../services/api";
import "./UsuariosLista.css";

function UsuariosLista({ setCurrentScreen, setAdminItemId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    try {
      const resposta = await api.get("/pacientes");
      const usuariosOrdenados = resposta.data.sort((a, b) => a.id - b.id);
      setUsuarios(usuariosOrdenados);
    } catch (erro) {
      console.log("Erro ao buscar usuários:", erro);
    }
  }

  const sugestoes = usuarios.filter((usuario) =>
    usuario.nomeCompleto?.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirEditor(id) {
    setAdminItemId(id);
    setCurrentScreen("usuarios-editar");
  }

  function abrirModalExclusao(usuario) {
    setUsuarioSelecionado(usuario);
    setModalAberto(true);
  }

  function fecharModalExclusao() {
    setUsuarioSelecionado(null);
    setModalAberto(false);
  }

  async function confirmarExclusao() {
    if (!usuarioSelecionado) return;

    try {
      await api.delete(`/pacientes/${usuarioSelecionado.id}`);
      fecharModalExclusao();
      buscarUsuarios();
    } catch (erro) {
      console.log("Erro ao excluir usuário:", erro);
    }
  }

  async function alterarStatus(usuario) {
    try {
      const usuarioAtualizado = {
        ...usuario,
        status: !usuario.status
      };

      await api.put(`/pacientes/${usuario.id}`, usuarioAtualizado);
      buscarUsuarios();
    } catch (erro) {
      console.log("Erro ao alterar status:", erro);
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h1>Gerenciador de Usuários</h1>
        </div>

        <div className="busca-container">
          <div className="campo-busca">
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            {busca && (
              <div className="lista-sugestoes">
                {sugestoes.map((usuario) => (
                  <button
                    key={usuario.id}
                    type="button"
                    className="item-sugestao"
                    onClick={() => abrirEditor(usuario.id)}
                  >
                    <strong>{usuario.nomeCompleto}</strong>
                    <span>{usuario.tipoConvenio || usuario.tipoUsuario}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Convênio</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nomeCompleto}</td>
                  <td>{usuario.tipoConvenio || "-"}</td>

                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={usuario.status}
                        onChange={() => alterarStatus(usuario)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>

                  <td className="acoes">
                    <button
                      className="editar-btn"
                      type="button"
                      onClick={() => abrirEditor(usuario.id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="excluir-btn"
                      type="button"
                      onClick={() => abrirModalExclusao(usuario)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalAberto && (
          <div className="modal-fundo">
            <div className="modal-exclusao">
              <div className="modal-icone">
                <FaExclamationTriangle />
              </div>

              <h2>Confirmar exclusão</h2>

              <p>
                Tem certeza que deseja excluir o usuário{" "}
                <strong>{usuarioSelecionado?.nomeCompleto}</strong>?
              </p>

              <span>Esta ação não poderá ser desfeita.</span>

              <div className="modal-acoes">
                <button
                  type="button"
                  className="modal-cancelar"
                  onClick={fecharModalExclusao}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="modal-confirmar"
                  onClick={confirmarExclusao}
                >
                  Excluir usuário
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}

export default UsuariosLista;