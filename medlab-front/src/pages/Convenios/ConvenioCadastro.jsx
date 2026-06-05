import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useState } from "react";
import api from "../../services/api";
import "./Convenios.css";

function ConvenioCadastro({ setCurrentScreen }) {
  const [mensagem, setMensagem] = useState(false);
  const [erro, setErro] = useState("");

  const [formulario, setFormulario] = useState({
    nome: "",
    codigo: "",
    tipo: "",
    valorCoparticipacao: "",
    observacoes: "",
    status: true
  });

  function atualizarCampo(campo, valor) {
    setFormulario({
      ...formulario,
      [campo]: valor
    });

    setErro("");
  }

  function validarFormulario() {
    if (!formulario.nome.trim()) return "O nome do convênio é obrigatório.";
    if (!formulario.codigo.trim()) return "O código do convênio é obrigatório.";
    if (!formulario.tipo.trim()) return "O tipo do convênio é obrigatório.";
    if (!formulario.valorCoparticipacao.trim()) {
      return "O valor de coparticipação é obrigatório.";
    }

    return "";
  }

  async function cadastrarConvenio(event) {
    event.preventDefault();

    const mensagemErro = validarFormulario();

    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }

    try {
      await api.post("/convenios", formulario);
      setMensagem(true);

      setTimeout(() => {
        setMensagem(false);
        setCurrentScreen("convenios");
      }, 1200);
    } catch (erro) {
      console.log("Erro ao cadastrar convênio:", erro);
      setErro("Não foi possível cadastrar o convênio. Tente novamente.");
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="formulario-convenio-pagina">
        {mensagem && (
          <div className="mensagem-convenio">
            Convênio cadastrado com sucesso!
          </div>
        )}

        <div className="formulario-convenio-topo">
          <button type="button" onClick={() => setCurrentScreen("convenios")}>
            ← Voltar
          </button>
        </div>

        <div className="formulario-convenio-conteudo">
          <span>Cadastro de Convênio</span>

          <form className="formulario-convenio" onSubmit={cadastrarConvenio}>
            {erro && <div className="erro-formulario">{erro}</div>}

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
                  onChange={(event) =>
                    atualizarCampo("tipo", event.target.value)
                  }
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
              Cadastrar convênio
            </button>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default ConvenioCadastro;