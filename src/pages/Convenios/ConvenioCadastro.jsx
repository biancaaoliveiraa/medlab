import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useNavigate } from "react-router-dom";
import "./Convenios.css";

function ConvenioCadastro() {
  const navigate = useNavigate();

  function cadastrarConvenio(event) {
    event.preventDefault();
    alert("Convênio cadastrado com sucesso!");
    navigate("/convenios");
  }

  return (
    <LayoutAdmin>
      <div className="formulario-convenio-pagina">
        <div className="formulario-convenio-topo">
          <button type="button" onClick={() => navigate("/convenios")}>
            ← Voltar
          </button>
        </div>

        <div className="formulario-convenio-conteudo">
          <span>Cadastro de Convênio</span>

          <form className="formulario-convenio" onSubmit={cadastrarConvenio}>
            <div className="campo-convenio">
              <label>Nome do Convênio</label>
              <input type="text" />
            </div>

            <div className="linha-convenio">
              <div className="campo-convenio">
                <label>Código</label>
                <input type="text" />
              </div>

              <div className="campo-convenio">
                <label>Tipo</label>
                <input type="text" />
              </div>
            </div>

            <div className="campo-convenio">
              <label>Valor Coparticipação</label>
              <input type="text" />
            </div>

            <div className="campo-convenio">
              <label>Observações:</label>
              <textarea></textarea>
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