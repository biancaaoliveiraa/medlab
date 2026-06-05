import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../../services/api";
import "./Relatorios.css";

function Relatorios({ setCurrentScreen }) {
  const [mensagem, setMensagem] = useState(false);

  const [relatorio, setRelatorio] = useState({
    periodo: "",
    tipoRelatorio: "",
    consultas: 0,
    exames: 0,
    faturamento: ""
  });

  const [dataInicial, setDataInicial] = useState("2026-04-01");
  const [dataFinal, setDataFinal] = useState("2026-04-10");

  useEffect(() => {
    buscarRelatorio();
  }, []);

  async function buscarRelatorio() {
    try {
      const resposta = await api.get("/relatorios");

      if (resposta.data.length > 0) {
        setRelatorio(resposta.data[0]);
      }
    } catch (erro) {
      console.log("Erro ao buscar relatório:", erro);
    }
  }

  function aplicarFiltro(event) {
    event.preventDefault();

    const periodoSelecionado = `${formatarData(dataInicial)} - ${formatarData(
      dataFinal
    )}`;

    setRelatorio({
      ...relatorio,
      periodo: periodoSelecionado
    });
  }

  function formatarData(data) {
    if (!data) {
      return "";
    }

    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function exportarPdf() {
    const documento = new jsPDF();

    documento.setFontSize(18);
    documento.text("Relatório MedLab", 14, 20);

    documento.setFontSize(11);
    documento.text(`Período: ${relatorio.periodo}`, 14, 32);
    documento.text(`Tipo de Relatório: ${relatorio.tipoRelatorio}`, 14, 40);

    autoTable(documento, {
      startY: 52,
      head: [["Indicador", "Resultado"]],
      body: [
        ["Consultas", relatorio.consultas],
        ["Exames", relatorio.exames],
        ["Faturamento", relatorio.faturamento]
      ]
    });

    documento.save("relatorio-medlab.pdf");

    setMensagem(true);

    setTimeout(() => {
      setMensagem(false);
    }, 3000);
  }

  return (
    <LayoutAdmin setCurrentScreen={setCurrentScreen}>
      <div className="relatorios-pagina">
        {mensagem && (
          <div className="mensagem-relatorio">
            Relatório exportado com sucesso!
          </div>
        )}

        <div className="relatorios-conteudo">
          <h1>Relatórios</h1>

          <form className="card-relatorio" onSubmit={aplicarFiltro}>
            <div className="campo-relatorio">
              <label>Período</label>

              <div className="periodo-relatorio">
                <input
                  type="date"
                  value={dataInicial}
                  onChange={(event) => setDataInicial(event.target.value)}
                />

                <input
                  type="date"
                  value={dataFinal}
                  onChange={(event) => setDataFinal(event.target.value)}
                />
              </div>
            </div>

            <div className="campo-relatorio">
              <label>Tipo de Relatório</label>

              <select value={relatorio.tipoRelatorio} readOnly>
                <option value="Consultas por médico">
                  Consultas por médico
                </option>
                <option value="Faturamento">Faturamento</option>
                <option value="Convênios mais utilizados">
                  Convênios mais utilizados
                </option>
                <option value="Taxa de faltas">Taxa de faltas</option>
              </select>
            </div>

            <div className="indicadores-relatorio">
              <div>
                <span>Consultas</span>
                <strong>{relatorio.consultas}</strong>
              </div>

              <div>
                <span>Exames</span>
                <strong>{relatorio.exames}</strong>
              </div>

              <div>
                <span>Faturamento</span>
                <strong>{relatorio.faturamento}</strong>
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