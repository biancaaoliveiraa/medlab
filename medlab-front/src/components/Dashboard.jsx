import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#e8f7fd] font-sans text-[#0a191e] flex flex-col selection:bg-[#38b6ff]/30 w-full p-6">
      
      {/* Conteúdo Principal da Clínica */}
      <main className="flex-1 w-full space-y-6">
        
        {/* Bloco Superior: Perfil Prático do Médico & Indicadores do Dia */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
          
          {/* Card de Identificação Médica */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-cyan-100/60 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#38b6ff]/10 flex items-center justify-center font-black text-sm text-[#208cd0] border border-[#38b6ff]/20 shrink-0">
                DR
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Dr. Carlos Antônio</h2>
                <p className="text-xs font-bold text-[#0d7c85] mt-0.5">CRM 12345 / BA</p>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Cardiologia Clínica e Eletrofisiologia</p>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Local de Atendimento:</span>
              <span className="text-[#208cd0] bg-[#e8f7fd] px-2.5 py-0.5 rounded-lg font-black uppercase text-[10px] tracking-wider">
                Sala 10
              </span>
            </div>
          </div>

          {/* Resumo Numérico Rápido das Consultas */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Pacientes do Dia */}
            <div className="bg-white p-5 rounded-2xl border border-cyan-100/60 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2">
                {/* Ícone Moderno: Calendário Clínico */}
                <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-1 16H6a1 1 0 0 1-1-1v-8h14v8a1 1 0 0 1-1 1Zm1-11H5a1 1 0 0 1-1-1 1 1 0 0 1 1-1h14a1 1 0 0 1 1 1 1 1 0 0 1-1 1Zm-5 4H8a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2Z"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Agendado</span>
              </div>
              <div className="mt-4">
                <h3 className="text-4xl font-bold text-slate-800 tracking-tight">04</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Atendimentos do Dia</p>
              </div>
            </div>

            {/* Já Atendidos */}
            <div className="bg-white p-5 rounded-2xl border border-cyan-100/60 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2">
                {/* Ícone Moderno: Prontuário Finalizado com Check */}
                <svg className="w-5 h-5 text-[#00d2c4]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-1 16H6a1 1 0 0 1-1-1v-4h14v4a1 1 0 0 1-1 1Zm1-6H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1Zm-7-4-1.5 1.5 2 2 4-4L15.5 7 12 10.5 10 8.5Z"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Finalizado</span>
              </div>
              <div className="mt-4">
                <h3 className="text-4xl font-bold text-[#0a191e] tracking-tight">01</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Finalizados hoje</p>
              </div>
            </div>

            {/* Aguardando Chamada */}
            <div className="bg-white p-5 rounded-2xl border border-cyan-100/60 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2">
                {/* Ícone Moderno: Fila de Pacientes e Tempo */}
                <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm4.7 10a1 1 0 0 0-.2-.1 3 3 0 0 0-3-4.9H16a3 3 0 0 0-3 3v2a1 1 0 0 0 2 0h6.7a1 1 0 0 0 .3-2Zm-3.2 0h-5v-1c0-.83.67-1.5 1.5-1.5h1a1 1 0 0 1 1 1v1.5Zm-8.5-7C7.66 8 9 6.66 9 5S7.66 2 6 2 3 3.34 3 5s1.34 3 3 3Zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm0 6c-3.31 0-6 1.34-6 3v2a1 1 0 0 0 2 0h1a3 3 0 0 1 3-3h.7a3 3 0 0 1 2.3 2H9.7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V10c0-1.66-2.69-3-6-3Zm3.17 6.17a3 3 0 1 1 0 4h4v2a1 1 0 0 0 2 0V17.5a1 1 0 0 0-1-1h-5ZM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Em Espera</span>
              </div>
              <div className="mt-4">
                <h3 className="text-4xl font-bold text-slate-800 tracking-tight">03</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Aguardando na fila</p>
              </div>
            </div>

          </div>
        </div>

        {/* Fila Ambulatorial de Pacientes */}
        <div className="bg-white p-6 rounded-2xl border border-cyan-100/60 shadow-sm space-y-4 w-full">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Fila Geral de Atendimento do Dia</h3>
            <span className="text-[11px] font-bold bg-[#38b6ff]/10 text-[#208cd0] px-2.5 py-0.5 rounded-md">Lista de Rotina</span>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="p-3.5">Nome do Paciente</th>
                  <th className="p-3.5 w-44">CPF / Documento</th>
                  <th className="p-3.5">Tipo de Atendimento</th>
                  <th className="p-3.5">Exame / Procedimento</th>
                  <th className="p-3.5 text-center w-36">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900 text-sm">João Silva</td>
                  <td className="p-4 font-mono text-slate-500 font-semibold tracking-wide">048.239.122-85</td>
                  <td className="p-4 text-slate-600 font-medium">Consulta de Rotina</td>
                  <td className="p-4 text-slate-700 font-semibold">Colesterol Total</td>
                  <td className="p-2 text-center">
                    <span className="bg-[#0d7c85] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block w-24">Finalizado</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900 text-sm">Maria Gomes</td>
                  <td className="p-4 font-mono text-slate-500 font-semibold tracking-wide">702.411.903-44</td>
                  <td className="p-4 text-slate-600 font-medium">Consulta de Retorno</td>
                  <td className="p-4 text-slate-700 font-semibold">Hemograma Completo</td>
                  <td className="p-2 text-center">
                    <span className="bg-[#0e2229] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block w-24">Em Espera</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900 text-sm">Pedro Santos</td>
                  <td className="p-4 font-mono text-slate-500 font-semibold tracking-wide">122.904.382-10</td>
                  <td className="p-4 text-slate-600 font-medium">Consulta de Rotina</td>
                  <td className="p-4 text-slate-700 font-semibold">Eletrocardiograma</td>
                  <td className="p-2 text-center">
                    <span className="bg-[#0e2229] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block w-24">Em Espera</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900 text-sm">Lucas Oliveira</td>
                  <td className="p-4 font-mono text-slate-500 font-semibold tracking-wide">334.102.887-55</td>
                  <td className="p-4 text-slate-600 font-medium">Avaliação Particular</td>
                  <td className="p-4 text-slate-700 font-semibold">Glicemia em Jejum</td>
                  <td className="p-2 text-center">
                    <span className="bg-slate-400 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block w-24">Agendado</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}