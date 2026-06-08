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
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pacientes do Dia</span>
              <div className="mt-2">
                <h3 className="text-3xl font-black text-slate-900">04</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Total agendado</p>
              </div>
            </div>

            {/* Já Atendidos */}
            <div className="bg-white p-5 rounded-2xl border border-cyan-100/60 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">Atendidos</span>
              <div className="mt-2">
                <h3 className="text-3xl font-black text-emerald-600">01</h3>
                <p className="text-[11px] text-emerald-600/70 mt-0.5">Concluídos</p>
              </div>
            </div>

            {/* Aguardando Chamada */}
            <div className="bg-white p-5 rounded-2xl border border-cyan-100/60 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">Aguardando</span>
              <div className="mt-2">
                <h3 className="text-3xl font-black text-amber-600">03</h3>
                <p className="text-[11px] text-amber-600/70 mt-0.5">Na fila da clínica</p>
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