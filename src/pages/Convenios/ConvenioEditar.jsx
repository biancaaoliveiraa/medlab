import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./Convenios.css";

function ConvenioEditar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const convenios = [
    {
      id: 1,
      nome: "Bradesco Saúde",
      codigo: "BRD001",
      tipo: "FIXO",
      coparticipacao: "R$ 50,00",
      ativo: true,
      observacoes: ""
    },
    {
      id: 2,
      nome: "Unimed",
      codigo: "UNI001",
      tipo: "FIXO",
      coparticipacao: "R$ 45,00",
      ativo: true,
      observacoes: ""
    },
    {
      id: 3,
      nome: "SulAmérica",
      codigo: "SUL001",
      tipo: "FIXO",
      coparticipacao: "R$ 60,00",
      ativo: true,
      observacoes: ""
    },
    {
      id: 4,
      nome: "Amil",
      codigo: "AML001",
      tipo: "FIXO",
      coparticipacao: "R$ 40,00",
      ativo: false,
      observacoes: ""
    }
  ];

  const convenioSelecionado = convenios.find(
    (convenio) => convenio.id === Number(id)
  );

  const [mensagem, setMensagem] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: convenioSelecionado?.nome || "",
    codigo: convenioSelecionado?.codigo || "",
    tipo: convenioSelecionado?.tipo || "",
    coparticipacao: convenioSelecionado?.coparticipacao || "",
    ativo: convenioSelecionado?.ativo || false,
    observacoes: convenioSelecionado?.observacoes || ""
  });

  function atualizarCampo(campo, valor) {
    setFormulario({
      ...formulario,
      [campo]: valor
    });
  }

  function salvarAlteracoes(event) {
    event.preventDefault();
    setMensagem(true);

    setTimeout(() => {
      setMensagem(false);
    }, 3000);
  }

  return (
    <LayoutAdmin>
      <div className="formulario-convenio-pagina">
        {mensagem && (
          <div className="mensagem-convenio">
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="formulario-convenio-topo">
          <button type="button" onClick={() => navigate("/convenios")}>
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
                value={formulario.coparticipacao}
                onChange={(event) =>
                  atualizarCampo("coparticipacao", event.target.value)
                }
              />
            </div>

            <div className="status-convenio">
              <label>Status</label>

              <label className="switch-convenio">
                <input
                  type="checkbox"
                  checked={formulario.ativo}
                  onChange={(event) =>
                    atualizarCampo("ativo", event.target.checked)
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