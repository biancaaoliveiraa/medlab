import React, { useState } from 'react';

export default function Atendimentos() {
  const dadosAgendamentos = [
    { hora: "08:00", nome: "João Silva", cpf: "048.239.122-85", tipo: "Consulta de Rotina", exame: "Colesterol Total", status: "Finalizado", dia: 7, mes: 5 }, 
    { hora: "09:15", nome: "Maria Gomes", cpf: "702.411.903-44", tipo: "Consulta de Retorno", exame: "Hemograma Completo", status: "Em Espera", dia: 7, mes: 5 },
    { hora: "10:30", nome: "Pedro Santos", cpf: "122.904.382-10", tipo: "Consulta de Rotina", exame: "Eletrocardiograma", status: "Em Espera", dia: 7, mes: 5 },
    { hora: "14:00", nome: "Lucas Oliveira", cpf: "334.102.887-55", tipo: "Avaliação Particular", exame: "Glicemia em Jejum", status: "Agendado", dia: 8, mes: 5 },
    { hora: "08:30", nome: "Ana Beatriz", cpf: "445.211.398-00", tipo: "Consulta de Rotina", exame: "Ultrassonografia", status: "Agendado", dia: 12, mes: 5 },
    { hora: "11:00", nome: "Carlos Henrique", cpf: "998.102.344-11", tipo: "Consulta de Retorno", exame: "Ecocardiograma", status: "Finalizado", dia: 15, mes: 6 } 
  ];

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const [mesIndex, setMesIndex] = useState(5); 
  const [ano, setAno] = useState(2026);
  const [diaSelecionado, setDiaSelecionado] = useState(7); 
  const [buscaPaciente, setBuscaPaciente] = useState('');
  const [modoFiltro, setModoFiltro] = useState('dia');

  const mesAnterior = () => {
    if (mesIndex === 0) {
      setMesIndex(11);
      setAno(ano - 1);
    } else {
      setMesIndex(mesIndex - 1);
    }
  };

  const proximoMes = () => {
    if (mesIndex === 11) {
      setMesIndex(0);
      setAno(ano + 1);
    } else {
      setMesIndex(mesIndex + 1);
    }
  };

  const totalDias = 30;
  const diasGrade = Array.from({ length: totalDias }, (_, i) => i + 1);

  const pacientesFiltrados = dadosAgendamentos.filter(paciente => {
    const matchesBusca = paciente.nome.toLowerCase().includes(buscaPaciente.toLowerCase());
    const mesmoMes = paciente.mes === mesIndex;
    if (!matchesBusca || !mesmoMes) return false;
    if (modoFiltro === 'dia') return paciente.dia === diaSelecionado;
    if (modoFiltro === 'semana') return paciente.dia >= diaSelecionado && paciente.dia <= (diaSelecionado + 6);
    if (modoFiltro === 'mes') return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0e2229] flex flex-col selection:bg-[#00d2c4]/20 w-full p-6">
      
      <main className="flex-1 w-full space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Calendário Clínico</h3>
                <p className="text-[11px] text-slate-400 font-medium">Filtro por data</p>
              </div>
              
              <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
                <button onClick={mesAnterior} className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-xs font-bold transition text-[#0e2229]">&lt;</button>
                <span className="text-[11px] font-black text-[#0e2229] px-1 min-w-[75px] text-center">{meses[mesIndex]} {ano}</span>
                <button onClick={proximoMes} className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-xs font-bold transition text-[#0e2229]">&gt;</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold text-center select-none">
              <button 
                onClick={() => setModoFiltro('dia')}
                className={`py-1.5 rounded-md transition duration-150 border ${
                  modoFiltro === 'dia' 
                    ? "bg-[#00d2c4] text-white border-[#00d2c4] shadow-sm font-black" 
                    : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                }`}
              >
                Hoje
              </button>
              <button 
                onClick={() => setModoFiltro('semana')}
                className={`py-1.5 rounded-md transition duration-150 border ${
                  modoFiltro === 'semana' 
                    ? "bg-[#00d2c4] text-white border-[#00d2c4] shadow-sm font-black" 
                    : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                }`}
              >
                Esta Semana
              </button>
              <button 
                onClick={() => setModoFiltro('mes')}
                className={`py-1.5 rounded-md transition duration-150 border ${
                  modoFiltro === 'mes' 
                    ? "bg-[#00d2c4] text-white border-[#00d2c4] shadow-sm font-black" 
                    : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                }`}
              >
                Visão Mensal
              </button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black uppercase text-slate-400 tracking-wider">
                <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-700">
                <span className="p-2 text-slate-300">31</span>
                {diasGrade.map((dia) => {
                  const isSelecionado = dia === diaSelecionado;
                  return (
                    <span
                      key={dia}
                      onClick={() => { setDiaSelecionado(dia); if (modoFiltro !== 'semana') setModoFiltro('dia'); }}
                      className={`p-2 rounded-lg cursor-pointer transition select-none ${
                        isSelecionado 
                          ? "bg-[#00d2c4] text-white font-black shadow-sm" 
                          : "hover:bg-[#00d2c4]/10"
                      }`}
                    >
                      {dia < 10 ? `0${dia}` : dia}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#00d2c4]"></span> Agenda Ativa
              </span>
              <span className="text-[#0e2229] font-black bg-[#00d2c4]/10 px-2 py-0.5 rounded">
                Data: {diaSelecionado < 10 ? `0${diaSelecionado}` : diaSelecionado}/{mesIndex + 1 < 10 ? `0${mesIndex + 1}` : mesIndex + 1}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-xs text-[#0e2229] uppercase tracking-wider">
                  Agendados para o Período
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">Cruzamento de horários e busca nominal</p>
              </div>
              
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar paciente..."
                  value={buscaPaciente}
                  onChange={(e) => setBuscaPaciente(e.target.value)}
                  className="w-full bg-slate-50 text-xs px-3.5 py-2 pl-8 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#00d2c4] focus:bg-white font-medium transition"
                />
                <span className="absolute left-2.5 top-2.5 text-slate-400 text-[11px]">🔍</span>
              </div>
            </div>
            
            <div className="overflow-x-auto w-full">
              {pacientesFiltrados.length > 0 ? (
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <th className="p-3.5 w-24">Horário</th>
                      <th className="p-3.5">Nome do Paciente</th>
                      <th className="p-3.5 w-44">CPF / Documento</th>
                      <th className="p-3.5">Tipo</th>
                      <th className="p-3.5">Procedimento</th>
                      <th className="p-3.5 text-center w-32">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pacientesFiltrados.map((paciente, idx) => (
                      <tr key={idx} className="hover:bg-[#00d2c4]/5 transition group">
                        <td className="p-4 font-black text-[#0e2229] bg-[#00d2c4]/10 text-sm tracking-wide">{paciente.hora}</td>
                        <td className="p-4 font-bold text-slate-900 text-sm group-hover:text-[#0e2229] transition">{paciente.nome}</td>
                        <td className="p-4 font-mono text-slate-500 font-semibold">{paciente.cpf}</td>
                        <td className="p-4 text-slate-500 font-medium">{paciente.tipo}</td>
                        <td className="p-4 text-slate-700 font-semibold">{paciente.exame}</td>
                        <td className="p-2 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-block w-24 shadow-sm ${
                            paciente.status === 'Finalizado' ? 'bg-[#0e2229] text-[#00d2c4]' :
                            paciente.status === 'Agendado' ? 'bg-[#00d2c4] text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {paciente.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-16 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <span className="text-3xl block mb-2 opacity-40">📅</span>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sem atendimentos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}