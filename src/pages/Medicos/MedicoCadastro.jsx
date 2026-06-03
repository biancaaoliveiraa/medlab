import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useNavigate } from "react-router-dom";
import "./MedicoFormulario.css";

function MedicoCadastro() {
  const navigate = useNavigate();

  function cadastrarMedico(event) {
    event.preventDefault();
    alert("Médico cadastrado com sucesso!");
    navigate("/medicos");
  }

  return (
    <LayoutAdmin>
      <div className="formulario-medico-pagina">
        <div className="formulario-medico-topo">
          <button type="button" onClick={() => navigate("/medicos")}>
            ← Voltar
          </button>
        </div>

        <div className="formulario-medico-conteudo">
          <span>Cadastro de médico</span>

          <h1>Dados do médico</h1>

          <form className="formulario-medico" onSubmit={cadastrarMedico}>
            <div className="campo-medico">
              <label>Nome Completo</label>
              <input type="text" placeholder="Nome do Médico" />
            </div>

            <div className="linha-medico">
              <div className="campo-medico">
                <label>CRM</label>
                <input type="text" placeholder="00000" />
              </div>

              <div className="campo-medico">
                <label>UF</label>
                <input type="text" placeholder="BA" />
              </div>
            </div>

            <div className="campo-medico">
              <label>Especialidade médica</label>
              <input type="text" />
            </div>

            <h2>Canais de Contato</h2>

            <div className="campo-medico">
              <label>E-mail Profissional</label>
              <input type="email" placeholder="medico@medlab.com" />
            </div>

            <div className="campo-medico">
              <label>Telefone/Whatsapp</label>
              <input type="text" placeholder="(00) 00000-0000" />
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