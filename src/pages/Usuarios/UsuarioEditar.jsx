import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import "./UsuarioEditar.css";

function UsuarioEditar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const usuarios = [
    {
      id: 1,
      nome: "João Silva",
      cpf: "482.615.739-08",
      nascimento: "15/08/1972",
      telefone: "(00) 00000-0000",
      email: "joao.silva@gmail.com",
      observacoes: "Paciente possui histórico de consultas recentes."
    },
    {
      id: 2,
      nome: "Maria Souza",
      cpf: "931.204.576-32",
      nascimento: "22/03/1988",
      telefone: "(00) 00000-0000",
      email: "maria.souza@gmail.com",
      observacoes: "Paciente vinculada ao convênio Bradesco Saúde."
    },
    {
      id: 3,
      nome: "Pedro Lima",
      cpf: "157.893.462-51",
      nascimento: "09/11/1994",
      telefone: "(00) 00000-0000",
      email: "pedro.lima@gmail.com",
      observacoes: ""
    },
    {
      id: 4,
      nome: "José Santos",
      cpf: "620.748.315-09",
      nascimento: "04/05/1980",
      telefone: "(00) 00000-0000",
      email: "jose.santos@gmail.com",
      observacoes: ""
    },
    {
      id: 5,
      nome: "Juliana Lima",
      cpf: "804.259.173-66",
      nascimento: "18/12/1991",
      telefone: "(00) 00000-0000",
      email: "juliana.lima@gmail.com",
      observacoes: ""
    }
  ];

  const usuarioSelecionado = usuarios.find(
    (usuario) => usuario.id === Number(id)
  );

  const [mensagem, setMensagem] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: usuarioSelecionado?.nome || "",
    cpf: usuarioSelecionado?.cpf || "",
    nascimento: usuarioSelecionado?.nascimento || "",
    telefone: usuarioSelecionado?.telefone || "",
    email: usuarioSelecionado?.email || "",
    observacoes: usuarioSelecionado?.observacoes || ""
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
      <div className="editor-usuario">
        {mensagem && (
          <div className="mensagem-sucesso">
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="editor-topo">
          <button type="button" onClick={() => navigate("/usuarios")}>
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
                value={formulario.nome}
                onChange={(event) =>
                  atualizarCampo("nome", event.target.value)
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
                type="text"
                value={formulario.nascimento}
                onChange={(event) =>
                  atualizarCampo("nascimento", event.target.value)
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