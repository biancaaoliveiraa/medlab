import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Convenios.css";

function ConvenioEditar({ setCurrentScreen, adminItemId }) {
  const [mensagem, setMensagem] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: "",
    codigo: "",
    tipo: "",
    valorCoparticipacao: "",
    observacoes: "",
    status: true
  });

  useEffect(() => {
    buscarConvenio();
  }, []);

  async function buscarConvenio() {
    if (!adminItemId) {
      setCurrentScreen("convenios");
      return;
    }

    try {
      const resposta = await api.get(`/convenios/${adminItemId}`);

      setFormulario({
        nome: resposta.data.nome || "",
        codigo: resposta.data.codigo || "",
        tipo: resposta.data.tipo || "",
        valorCoparticipacao: resposta.data.valorCoparticipacao || "",
        observacoes: resposta.data.observacoes || "",
        status: resposta.data.status
      });
    } catch (erro) {
      console.log("Erro ao buscar convênio:", erro);
    }
  }

  function atualizarCampo(campo, valor) {
    setFormulario({
      ...formulario,
      [campo]: valor
    });
  }

  async function salvarAlteracoes(event) {
    event.preventDefault();

    try {
      await api.put(`/convenios/${adminItemId}`, formulario);
      setMensagem(true);

      setTimeout(() => {
        setMensagem(false);
        setCurrentScreen("convenios");
      }, 1200);
    } catch (erro) {
      console.log("Erro ao salvar convênio:", erro);
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="formulario-convenio-pagina">
        {mensagem && (
          <div className="mensagem-convenio">
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="formulario-convenio-topo">
          <button type="button" onClick={() => setCurrentScreen("convenios")}>
            ← Voltar
          </button>
        </div>

        <div className="formulario-convenio-conteudo">
          <span>Editar de Convênio</span>

          <form className="formulario-convenio" onSubmit={salvarAlteracoes}>
            <div className="campo-convenio">
              <label>Nome do Convênio</label>
              <input
                type="text"
                value={formulario.nome}
                onChange={(event) => atualizarCampo("nome", event.target.value)}
              />
            </div>

            <div className="linha-convenio">
              <div className="campo-convenio">
                <label>Código</label>
                <input
                  type="text"
                  value={formulario.codigo}
                  onChange={(event) =>
                    atualizarCampo("codigo", event.target.value)
                  }
                />
              </div>

              <div className="campo-convenio">
                <label>Tipo</label>
                <input
                  type="text"
                  value={formulario.tipo}
                  onChange={(event) => atualizarCampo("tipo", event.target.value)}
                />
              </div>
            </div>

            <div className="campo-convenio">
              <label>Valor Coparticipação</label>
              <input
                type="text"
                value={formulario.valorCoparticipacao}
                onChange={(event) =>
                  atualizarCampo("valorCoparticipacao", event.target.value)
                }
              />
            </div>

            <div className="status-convenio">
              <label>Status</label>

              <label className="switch-convenio">
                <input
                  type="checkbox"
                  checked={formulario.status}
                  onChange={(event) =>
                    atualizarCampo("status", event.target.checked)
                  }
                />
                <span className="slider-convenio"></span>
              </label>
            </div>

            <div className="campo-convenio">
              <label>Observações:</label>
              <textarea
                value={formulario.observacoes}
                onChange={(event) =>
                  atualizarCampo("observacoes", event.target.value)
                }
              ></textarea>
            </div>

            <button type="submit" className="botao-convenio">
              Salvar alterações
            </button>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default ConvenioEditar;