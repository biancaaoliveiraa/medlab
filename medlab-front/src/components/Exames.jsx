import React, { useState } from 'react';

export default function Exames() {
  const [modalAberto, setModalAberto] = useState(false);
  const [listaExames, setListaExames] = useState([
    { id: "#EX01", p: "Ana Paula Guimarães", e: "Teste Ergométrico", s: "Finalizado" },
    { id: "#EX02", p: "José Bezerra", e: "Hemograma", s: "Pendente" },
    { id: "#EX03", p: "Luna Teixeira", e: "Eletrocardiograma", s: "Em Aberto" },
    { id: "#EX04", p: "Luciano Moraes", e: "Colesterol", s: "Finalizado" }
  ]);

  const [paciente, setPaciente] = useState('');
  const [exameNome, setExameNome] = useState('');
  const [status, setStatus] = useState('Pendente');

  const handleSalvarExame = (e) => {
    e.preventDefault();
    if (!paciente || !exameNome) return;

    const novoItem = {
      id: `#EX${String(listaExames.length + 1).padStart(2, '0')}`,
      p: paciente,
      e: examenNome,
      s: status
    };

    setListaExames([novoItem, ...listaExames]);
    setPaciente('');
    setExameNome('');
    setStatus('Pendente');
    setModalAberto(false);
  };

  return (
    <div className="min-h-screen bg-[#e8f7fd] font-sans text-[#0a191e] flex flex-col relative selection:bg-[#38b6ff]/30 p-6 md:p-8">
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto space-y-6">
        
        <div className="flex justify-end w-full">
          <button 
            onClick={() => setModalAberto(true)}
            className="bg-[#38b6ff] hover:bg-[#2fa3e6] text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar Resultado
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-cyan-100/60 overflow-hidden w-full">
          <div className="bg-slate-50/80 border-b border-slate-100 px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
            Laudos Clínicos Ativos e Histórico Recente
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-3.5 w-24">Código ID</th>
                  <th className="px-6 py-3.5">Nome do Paciente</th>
                  <th className="px-6 py-3.5">Exame Clínico</th>
                  <th className="px-6 py-3.5 text-center w-36">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listaExames.map((exame) => (
                  <tr key={exame.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400 text-sm">{exame.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-800 text-sm">{exame.p}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{exame.e}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide inline-block w-24 ${
                        exame.s === 'Finalizado' ? 'bg-[#0d7c85] text-white' :
                        exame.s === 'Pendente' ? 'bg-[#0e2229] text-white' : 'bg-slate-300 text-slate-700'
                      }`}>{exame.s}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Novo Resultado de Exame</h3>
              <button onClick={() => setModalAberto(false)} className="text-slate-400 hover:text-slate-600 transition text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleSalvarExame} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Nome do Paciente</label>
                <input 
                  type="text" 
                  value={paciente}
                  onChange={(e) => setPaciente(e.target.value)}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#38b6ff] transition text-sm" 
                  placeholder="Ex: Carlos Silva"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Nome do Exame</label>
                <input 
                  type="text" 
                  value={exameNome}
                  onChange={(e) => setExameNome(e.target.value)}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#38b6ff] transition text-sm" 
                  placeholder="Ex: Hemograma Completo"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Status Inicial</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#38b6ff] transition text-sm w-full"
                >
                  <option>Pendente</option>
                  <option>Em Aberto</option>
                  <option>Finalizado</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button 
                  type="button"
                  onClick={() => setModalAberto(false)} 
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2.5 rounded-xl bg-[#38b6ff] text-white font-bold hover:bg-[#2fa3e6] transition shadow-sm"
                >
                  Salvar Laudo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}