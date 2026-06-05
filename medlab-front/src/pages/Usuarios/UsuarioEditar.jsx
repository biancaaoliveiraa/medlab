import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UsuarioEditar.css";

function UsuarioEditar({ setCurrentScreen, adminItemId }) {
  const [mensagem, setMensagem] = useState(false);

  const [formulario, setFormulario] = useState({
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    tipoConvenio: "",
    observacoes: "",
    senha: "",
    tipoUsuario: "PACIENTE",
    status: true
  });

  useEffect(() => {
    buscarUsuario();
  }, []);

  async function buscarUsuario() {
    if (!adminItemId) {
      setCurrentScreen("usuarios");
      return;
    }

    try {
      const resposta = await api.get(`/pacientes/${adminItemId}`);

      setFormulario({
        nomeCompleto: resposta.data.nomeCompleto || "",
        cpf: resposta.data.cpf || "",
        dataNascimento: resposta.data.dataNascimento || "",
        telefone: resposta.data.telefone || "",
        email: resposta.data.email || "",
        tipoConvenio: resposta.data.tipoConvenio || "",
        observacoes: resposta.data.observacoes || "",
        senha: resposta.data.senha || "",
        tipoUsuario: resposta.data.tipoUsuario || "PACIENTE",
        status: resposta.data.status
      });
    } catch (erro) {
      console.log("Erro ao buscar usuário:", erro);
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
      await api.put(`/pacientes/${adminItemId}`, formulario);
      setMensagem(true);

      setTimeout(() => {
        setMensagem(false);
        setCurrentScreen("usuarios");
      }, 1200);
    } catch (erro) {
      console.log("Erro ao salvar usuário:", erro);
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="editor-usuario">
        {mensagem && (
          <div className="mensagem-sucesso">
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="editor-topo">
          <button type="button" onClick={() => setCurrentScreen("usuarios")}>
            ← Voltar
          </button>
        </div>

        <div className="editor-conteudo">
          <span>Editor de usuário</span>

          <h1>Dados do usuário</h1>

          <form className="formulario-editor" onSubmit={salvarAlteracoes}>
            <div className="campo-editor">
              <label>Nome Completo:</label>
              <input
                type="text"
                value={formulario.nomeCompleto}
                onChange={(event) =>
                  atualizarCampo("nomeCompleto", event.target.value)
                }
              />
            </div>

            <div className="campo-editor">
              <label>CPF:</label>
              <input
                type="text"
                value={formulario.cpf}
                onChange={(event) =>
                  atualizarCampo("cpf", event.target.value)
                }
              />
            </div>

            <div className="campo-editor">
              <label>Data de Nascimento:</label>
              <input
                type="date"
                value={formulario.dataNascimento}
                onChange={(event) =>
                  atualizarCampo("dataNascimento", event.target.value)
                }
              />
            </div>

            <div className="campo-editor">
              <label>Telefone:</label>
              <input
                type="text"
                value={formulario.telefone}
                onChange={(event) =>
                  atualizarCampo("telefone", event.target.value)
                }
              />
            </div>

            <div className="campo-editor">
              <label>E-mail:</label>
              <input
                type="email"
                value={formulario.email}
                onChange={(event) =>
                  atualizarCampo("email", event.target.value)
                }
              />
            </div>

            <div className="campo-editor">
              <label>Convênio:</label>
              <input
                type="text"
                value={formulario.tipoConvenio}
                onChange={(event) =>
                  atualizarCampo("tipoConvenio", event.target.value)
                }
              />
            </div>

            <div className="campo-editor">
              <label>Observações:</label>
              <textarea
                value={formulario.observacoes}
                onChange={(event) =>
                  atualizarCampo("observacoes", event.target.value)
                }
              ></textarea>
            </div>

            <button type="submit" className="botao-salvar">
              Salvar alterações
            </button>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default UsuarioEditar;