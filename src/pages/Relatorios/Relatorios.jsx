import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useState } from "react";
import "./Relatorios.css";

function Relatorios() {
  const [mensagem, setMensagem] = useState(false);

  function aplicarFiltro(event) {
    event.preventDefault();
  }

  function exportarPdf() {
    setMensagem(true);

    setTimeout(() => {
      setMensagem(false);
    }, 3000);
  }

  return (
    <LayoutAdmin>
      <div className="relatorios-pagina">
        {mensagem && (
          <div className="mensagem-relatorio">
            Relatório exportado com sucesso!
          </div>
        )}

        <div className="relatorios-conteudo">
          <span>Relatórios</span>

          <form className="card-relatorio" onSubmit={aplicarFiltro}>
            <div className="campo-relatorio">
              <label>Período</label>
              <input type="text" defaultValue="01/04/2026 - 10/04/2026" />
            </div>

            <div className="campo-relatorio">
              <label>Tipo de Relatório</label>
              <select defaultValue="consultas">
                <option value="consultas">Consultas por médico</option>
                <option value="faturamento">Faturamento</option>
                <option value="convenios">Convênios mais utilizados</option>
                <option value="faltas">Taxa de faltas</option>
              </select>
            </div>

            <div className="indicadores-relatorio">
              <div>
                <span>Consultas</span>
                <strong>48</strong>
              </div>

              <div>
                <span>Exames</span>
                <strong>32</strong>
              </div>

              <div>
                <span>Faturamento</span>
                <strong>R$ 8.500,00</strong>
              </div>
            </div>

            <button type="submit" className="botao-aplicar">
              Aplicar Filtro
            </button>
          </form>

          <button
            type="button"
            className="botao-exportar"
            onClick={exportarPdf}
          >
            Exportar PDF
          </button>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default Relatorios;