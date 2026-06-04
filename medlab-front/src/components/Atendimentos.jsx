import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Search } from 'lucide-react';

export default function Atendimentos() {
  // Estado para armazenar o dia atualmente visualizado
  const [dataSelecionada, setDataSelecionada] = useState("2026-03-26");
  const [buscaPaciente, setBuscaPaciente] = useState("");

  // Banco de dados simulado para múltiplos dias
  const agendaPorData = {
    "2026-03-25": [ // Ontem
      { hora: "08:00", nome: "Marcos Vinícius", tipo: "Consulta", status: "Atendido" },
      { hora: "09:30", nome: "Sandra Helena Ramos", tipo: "Exame: Ecocardiograma", status: "Atendido" },
      { hora: "11:00", nome: "Carlos Eduardo Silva", tipo: "Consulta", status: "Faltou" }
    ],
    "2026-03-26": [ // Data base do print original
      { hora: "07:00", nome: "Ana Paula Guimarães", tipo: "Consulta", status: "Agendado" },
      { hora: "08:00", nome: "José Bezerra", tipo: "Exame: Teste ergométrico", status: "Agendado" },
      { hora: "09:00", nome: "Luna Teixeira", tipo: "Exame: Eletrocardiograma", status: "Agendado" },
      { hora: "10:00", nome: "Luciano Moraes", tipo: "Consulta", status: "Agendado" },
      { hora: "11:00", nome: "Rodrigo Martinelli", tipo: "Exame: Eletrocardiograma", status: "Agendado" },
      { hora: "12:00", nome: "Carol Barbosa", tipo: "Exame: Holter 24h", status: "Agendado" }
    ],
    "2026-03-27": [ // Amanhã
      { hora: "07:30", nome: "Beatriz Albuquerque", tipo: "Consulta", status: "Agendado" },
      { hora: "09:00", nome: "Mariana Costa", tipo: "Exame: MAPA 24h", status: "Agendado" },
      { hora: "10:30", nome: "Roberto de Souza", tipo: "Consulta", status: "Agendado" }
    ],
    "2026-03-28": [ // Futuro
      { hora: "08:00", nome: "Geraldo Alckmin Neto", tipo: "Exame: Teste ergométrico", status: "Agendado" },
      { hora: "10:00", nome: "Fernanda Montenegro Ramos", tipo: "Consulta", status: "Agendado" }
    ]
  };

  // Funções de navegação de data
  const alterarDia = (diasParaMudar) => {
    const dataAtual = new Date(dataSelecionada + "T00:00:00");
    dataAtual.setDate(dataAtual.getDate() + diasParaMudar);
    
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    
    setDataSelecionada(`${ano}-${mes}-${dia}`);
  };

  // Formata a data em string legível brasileira
  const obterDataFormatada = () => {
    if (dataSelecionada === "2026-03-25") return "Ontem, 25/03";
    if (dataSelecionada === "2026-03-26") return "Hoje, 26/03";
    if (dataSelecionada === "2026-03-27") return "Amanhã, 27/03";

    const partes = dataSelecionada.split("-");
    return `Dia ${partes[2]}/${partes[1]}`;
  };

  const listaDoDia = agendaPorData[dataSelecionada] || [];

  const listaFiltrada = listaDoDia.filter(p => 
    p.nome.toLowerCase().includes(buscaPaciente.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-12">
      
      {/* Bloco de Controle de Calendário Avançado */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Controle de Atendimentos</h2>
          <p className="text-sm text-gray-400 mt-1">Monitore e alterne entre as agendas diárias passadas, atuais e futuras.</p>
        </div>

        {/* Componente Seletor de Calendário Nativo */}
        <div className="flex items-center gap-3 bg-[#e2f5ff] px-4 py-2.5 rounded-2xl border border-blue-100 self-start md:self-auto">
          <Calendar size={18} className="text-[#1a535c]" />
          <span className="text-xs font-bold text-[#1a535c] mr-1">Ir para data:</span>
          <input 
            type="date" 
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
            className="bg-white border border-blue-200 rounded-xl px-2 py-1 text-xs font-bold text-gray-700 outline-none focus:border-blue-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Barra Dinâmica de Navegação Temporal */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-6 py-4 rounded-3xl shadow-sm border border-white">
        
        {/* Botões Rápidos de Atalho */}
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl w-full sm:w-auto">
          <button 
            onClick={() => setDataSelecionada("2026-03-25")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${dataSelecionada === '2026-03-25' ? 'bg-[#1a535c] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Ontem
          </button>
          <button 
            onClick={() => setDataSelecionada("2026-03-26")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${dataSelecionada === '2026-03-26' ? 'bg-[#1a535c] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Hoje
          </button>
          <button 
            onClick={() => setDataSelecionada("2026-03-27")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${dataSelecionada === '2026-03-27' ? 'bg-[#1a535c] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Amanhã
          </button>
        </div>

        {/* Barra de Pesquisa por Nome */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Procurar paciente no dia..."
            value={buscaPaciente}
            onChange={(e) => setBuscaPaciente(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:border-blue-200 text-gray-700"
          />
        </div>
      </div>

      {/* Card da Agenda Principal */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-white flex flex-col gap-5">
        
        {/* Cabeçalho da Lista */}
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black text-gray-800 tracking-tight">
              {obterDataFormatada()}
            </h3>
            <span className="bg-emerald-50 text-emerald-600 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
              {listaFiltrada.length} {listaFiltrada.length === 1 ? 'agendado' : 'agendados'}
            </span>
          </div>

          {/* Setas sequenciais */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => alterarDia(-1)}
              className="p-2 border border-gray-100 rounded-xl bg-white text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              title="Voltar 1 Dia"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => alterarDia(1)}
              className="p-2 border border-gray-100 rounded-xl bg-white text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              title="Avançar 1 Dia"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Lista Cronológica */}
        <div className="flex flex-col gap-1 divide-y divide-gray-50/70">
          {listaFiltrada.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-4 pl-1 pr-2 group hover:bg-gray-50/40 rounded-xl transition-all gap-3">
              
              <div className="flex items-start gap-4">
                {/* Linha de Horário */}
                <span className="text-sm font-black text-gray-800 min-w-[45px] pt-0.5">
                  {item.hora}
                </span>
                
                {/* Divisor Visual Cinza Vertical */}
                <div className="w-[2px] h-9 bg-gray-200 rounded-full shrink-0 group-hover:bg-[#4ea8de] transition-colors" />
                
                {/* Nome do Paciente e Detalhes */}
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-sm group-hover:text-blue-900 transition-colors">
                    {item.nome}
                  </span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5">
                    {item.tipo}
                  </span>
                </div>
              </div>

              {/* Apenas a Tag de Status */}
              <div className="flex items-center justify-end">
                <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md ${
                  item.status === 'Atendido' ? 'bg-emerald-50 text-emerald-600' :
                  item.status === 'Faltou' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-[#4ea8de]'
                }`}>
                  {item.status}
                </span>
              </div>

            </div>
          ))}

          {/* Estado de tela vazia */}
          {listaFiltrada.length === 0 && (
            <div className="text-center py-12 text-gray-400 italic bg-gray-50/20 rounded-2xl border border-dashed border-gray-100 my-2">
              Nenhum compromisso médico agendado para esta data.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}