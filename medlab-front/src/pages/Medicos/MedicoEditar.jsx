import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MedicoFormulario.css";

function MedicoEditar({ setCurrentScreen, adminItemId }) {
  const [mensagem, setMensagem] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: "",
    crm: "",
    uf: "",
    especialidade: "",
    email: "",
    telefone: "",
    status: true
  });

  useEffect(() => {
    buscarMedico();
  }, []);

  async function buscarMedico() {
    if (!adminItemId) {
      setCurrentScreen("medicos");
      return;
    }

    try {
      const resposta = await api.get(`/medicos/${adminItemId}`);

      setFormulario({
        nome: resposta.data.nome || "",
        crm: resposta.data.crm || "",
        uf: resposta.data.uf || "",
        especialidade: resposta.data.especialidade || "",
        email: resposta.data.email || "",
        telefone: resposta.data.telefone || "",
        status: resposta.data.status
      });
    } catch (erro) {
      console.log("Erro ao buscar médico:", erro);
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
      await api.put(`/medicos/${adminItemId}`, formulario);
      setMensagem(true);

      setTimeout(() => {
        setMensagem(false);
        setCurrentScreen("medicos");
      }, 1200);
    } catch (erro) {
      console.log("Erro ao salvar médico:", erro);
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="formulario-medico-pagina">
        {mensagem && (
          <div className="mensagem-medico">
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="formulario-medico-topo">
          <button type="button" onClick={() => setCurrentScreen("medicos")}>
            ← Voltar
          </button>
        </div>

        <div className="formulario-medico-conteudo">
          <span>Editor de médico</span>

          <h1>Dados do médico</h1>

          <form className="formulario-medico" onSubmit={salvarAlteracoes}>
            <div className="campo-medico">
              <label>Nome Completo</label>
              <input
                type="text"
                value={formulario.nome}
                onChange={(event) => atualizarCampo("nome", event.target.value)}
              />
            </div>

            <div className="linha-medico">
              <div className="campo-medico">
                <label>CRM</label>
                <input
                  type="text"
                  value={formulario.crm}
                  onChange={(event) => atualizarCampo("crm", event.target.value)}
                />
              </div>

              <div className="campo-medico">
                <label>UF</label>
                <input
                  type="text"
                  value={formulario.uf}
                  onChange={(event) => atualizarCampo("uf", event.target.value)}
                />
              </div>
            </div>

            <div className="campo-medico">
              <label>Especialidade médica</label>
              <input
                type="text"
                value={formulario.especialidade}
                onChange={(event) =>
                  atualizarCampo("especialidade", event.target.value)
                }
              />
            </div>

            <h2>Canais de Contato</h2>

            <div className="campo-medico">
              <label>E-mail Profissional</label>
              <input
                type="email"
                value={formulario.email}
                onChange={(event) => atualizarCampo("email", event.target.value)}
              />
            </div>

            <div className="campo-medico">
              <label>Telefone/Whatsapp</label>
              <input
                type="text"
                value={formulario.telefone}
                onChange={(event) =>
                  atualizarCampo("telefone", event.target.value)
                }
              />
            </div>
            <div className="campo-medico">
  <label>Senha</label>
  <input
    type="password"
    value={formulario.senha}
    onChange={(event) =>
      atualizarCampo("senha", event.target.value)
    }
  />
</div>

            <button type="submit" className="botao-medico">
              Salvar alterações
            </button>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default MedicoEditar;