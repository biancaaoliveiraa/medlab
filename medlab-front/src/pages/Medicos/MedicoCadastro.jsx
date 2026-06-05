import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useState } from "react";
import api from "../../services/api";
import "./MedicoFormulario.css";

function MedicoCadastro({ setCurrentScreen }) {
  const [mensagem, setMensagem] = useState(false);
  const [erro, setErro] = useState("");

const [formulario, setFormulario] = useState({
  nome: "",
  crm: "",
  uf: "",
  especialidade: "",
  email: "",
  telefone: "",
  senha: "",
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
    if (!formulario.nome.trim()) return "O nome do médico é obrigatório.";
    if (!formulario.crm.trim()) return "O CRM é obrigatório.";
    if (!formulario.uf.trim()) return "A UF é obrigatória.";
    if (!formulario.especialidade.trim()) return "A especialidade médica é obrigatória.";
    if (!formulario.email.trim()) return "O e-mail profissional é obrigatório.";
    if (!formulario.telefone.trim()) return "O telefone/WhatsApp é obrigatório.";

    return "";
  }

  async function cadastrarMedico(event) {
    event.preventDefault();

    const mensagemErro = validarFormulario();

    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }

    try {
      await api.post("/medicos", formulario);
      setMensagem(true);

      setTimeout(() => {
        setMensagem(false);
        setCurrentScreen("medicos");
      }, 1200);
    } catch (erro) {
      console.log("Erro ao cadastrar médico:", erro);
      setErro("Não foi possível cadastrar o médico. Tente novamente.");
    }
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="formulario-medico-pagina">
        {mensagem && (
          <div className="mensagem-medico">
            Médico cadastrado com sucesso!
          </div>
        )}

        <div className="formulario-medico-topo">
          <button type="button" onClick={() => setCurrentScreen("medicos")}>
            ← Voltar
          </button>
        </div>

        <div className="formulario-medico-conteudo">
          <span>Cadastro de médico</span>

          <h1>Dados do médico</h1>

          <form className="formulario-medico" onSubmit={cadastrarMedico}>
            {erro && <div className="erro-formulario">{erro}</div>}

            <div className="campo-medico">
              <label>Nome Completo</label>
              <input
                type="text"
                placeholder="Nome do Médico"
                value={formulario.nome}
                onChange={(event) => atualizarCampo("nome", event.target.value)}
              />
            </div>

            <div className="linha-medico">
              <div className="campo-medico">
                <label>CRM</label>
                <input
                  type="text"
                  placeholder="00000"
                  value={formulario.crm}
                  onChange={(event) => atualizarCampo("crm", event.target.value)}
                />
              </div>

              <div className="campo-medico">
                <label>UF</label>
                <input
                  type="text"
                  placeholder="BA"
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
                placeholder="medico@medlab.com"
                value={formulario.email}
                onChange={(event) => atualizarCampo("email", event.target.value)}
              />
            </div>

            <div className="campo-medico">
              <label>Telefone/Whatsapp</label>
              <input
                type="text"
                placeholder="(00) 00000-0000"
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
    placeholder="Digite uma senha"
    value={formulario.senha}
    onChange={(event) =>
      atualizarCampo("senha", event.target.value)
    }
  />
</div>
            <button type="submit" className="botao-medico">
              Cadastrar médico
            </button>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default MedicoCadastro;