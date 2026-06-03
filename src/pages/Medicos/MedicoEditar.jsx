import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./MedicoFormulario.css";

function MedicoEditar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const medicos = [
    {
      id: 1,
      nome: "Dr. Ricardo Almeida",
      crm: "157893",
      uf: "SP",
      especialidade: "Cardiologia",
      email: "ricardo@medlab.com",
      telefone: "(71) 98765-3065"
    },
    {
      id: 2,
      nome: "Dra. Camila Torres",
      crm: "200237",
      uf: "BA",
      especialidade: "Pediatria",
      email: "camila@medlab.com",
      telefone: "(71) 98888-2020"
    },
    {
      id: 3,
      nome: "Dr. Felipe Rocha",
      crm: "100236",
      uf: "BA",
      especialidade: "Ortopedia",
      email: "felipe@medlab.com",
      telefone: "(71) 97777-3030"
    }
  ];

  const medicoSelecionado = medicos.find((medico) => medico.id === Number(id));

  const [mensagem, setMensagem] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: medicoSelecionado?.nome || "",
    crm: medicoSelecionado?.crm || "",
    uf: medicoSelecionado?.uf || "",
    especialidade: medicoSelecionado?.especialidade || "",
    email: medicoSelecionado?.email || "",
    telefone: medicoSelecionado?.telefone || ""
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
      <div className="formulario-medico-pagina">
        {mensagem && (
          <div className="mensagem-medico">
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="formulario-medico-topo">
          <button type="button" onClick={() => navigate("/medicos")}>
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