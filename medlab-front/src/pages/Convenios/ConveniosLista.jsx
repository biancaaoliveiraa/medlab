import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaExclamationTriangle
} from "react-icons/fa";
import api from "../../services/api";
import "./Convenios.css";

function ConveniosLista({ setCurrentScreen, setAdminItemId }) {
  const [convenios, setConvenios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [convenioSelecionado, setConvenioSelecionado] = useState(null);

  useEffect(() => {
    buscarConvenios();
  }, []);

  async function buscarConvenios() {
    try {
      const resposta = await api.get("/convenios");
      const conveniosOrdenados = resposta.data.sort((a, b) => a.id - b.id);
      setConvenios(conveniosOrdenados);
    } catch (erro) {
      console.log("Erro ao buscar convênios:", erro);
    }
  }

  const sugestoes = convenios.filter((convenio) =>
    convenio.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirEditor(id) {
    setAdminItemId(id);
    setCurrentScreen("convenios-editar");
  }

  function abrirCadastro() {
    setCurrentScreen("convenios-cadastro");
  }

  function abrirModalExclusao(convenio) {
    setConvenioSelecionado(convenio);
    setModalAberto(true);
  }

  function fecharModalExclusao() {
    setConvenioSelecionado(null);
    setModalAberto(false);
  }

  async function confirmarExclusao() {
    if (!convenioSelecionado) return;

    try {
      await api.delete(`/convenios/${convenioSelecionado.id}`);
      fecharModalExclusao();
      buscarConvenios();
    } catch (erro) {
      console.log("Erro ao excluir convênio:", erro);
    }
  }

  async function alterarStatus(convenio) {
    try {
      const convenioAtualizado = {
        ...convenio,
        status: !convenio.status
      };

      await api.put(`/convenios/${convenio.id}`, convenioAtualizado);
      buscarConvenios();
    } catch (erro) {
      console.log("Erro ao alterar status:", erro);
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="convenios-container">
        <div className="convenios-header">
          <h1>Gerenciador de Convênios</h1>
        </div>

        <div className="busca-convenios">
          <div className="campo-busca-convenio">
            <input
              type="text"
              placeholder="Pesquisar convênio..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            {busca && (
              <div className="lista-sugestoes-convenio">
                {sugestoes.map((convenio) => (
                  <button
                    key={convenio.id}
                    type="button"
                    className="item-sugestao-convenio"
                    onClick={() => abrirEditor(convenio.id)}
                  >
                    <strong>{convenio.nome}</strong>
                    <span>{convenio.codigo}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lista-convenios">
          {convenios.map((convenio) => (
            <div className="card-convenio" key={convenio.id}>
              <div>
                <strong>{convenio.nome}</strong>
                <span>{convenio.codigo}</span>
              </div>

              <div className="acoes-convenio">
                <button
                  type="button"
                  className="editar-convenio"
                  onClick={() => abrirEditor(convenio.id)}
                >
                  <FaEdit />
                </button>

                <label className="switch-convenio">
                  <input
                    type="checkbox"
                    checked={convenio.status}
                    onChange={() => alterarStatus(convenio)}
                  />
                  <span className="slider-convenio"></span>
                </label>

                <button
                  type="button"
                  className="excluir-convenio"
                  onClick={() => abrirModalExclusao(convenio)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="botao-novo-convenio"
          onClick={abrirCadastro}
        >
          <FaPlus />
          Novo Convênio
        </button>

        {modalAberto && (
          <div className="modal-convenio-fundo">
            <div className="modal-convenio-exclusao">
              <div className="modal-convenio-icone">
                <FaExclamationTriangle />
              </div>

              <h2>Confirmar exclusão</h2>

              <p>
                Tem certeza que deseja excluir o convênio{" "}
                <strong>{convenioSelecionado?.nome}</strong>?
              </p>

              <span>Esta ação não poderá ser desfeita.</span>

              <div className="modal-convenio-acoes">
                <button
                  type="button"
                  className="modal-convenio-cancelar"
                  onClick={fecharModalExclusao}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="modal-convenio-confirmar"
                  onClick={confirmarExclusao}
                >
                  Excluir convênio
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}

export default ConveniosLista;