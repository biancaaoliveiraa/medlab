import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, AlertCircle, Plus, Search, Filter } from 'lucide-react';

export default function Exames() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('Todos'); // 'Todos', 'Concluído', 'Pendente', 'Em Análise'
  const [showFiltroMenu, setShowFiltroMenu] = useState(false);

  const listaExames = [
    { id: 1, paciente: "Ana Paula Guimarães", exame: "Eletrocardiograma", data: "03/06/2026", status: "Concluído", prioridade: "Normal" },
    { id: 2, paciente: "José Bezerra", exame: "Teste Ergométrico", data: "03/06/2026", status: "Pendente", prioridade: "Urgente" },
    { id: 3, paciente: "Luna Teixeira", exame: "Ecocardiograma", data: "02/06/2026", status: "Em Análise", prioridade: "Normal" },
    { id: 4, paciente: "Luciano Moraes", exame: "Holter 24h", data: "01/06/2026", status: "Concluído", prioridade: "Normal" },
    { id: 5, paciente: "Carla Diaz", exame: "MAPA 24h", data: "31/05/2026", status: "Pendente", prioridade: "Alta" },
  ];

  // Filtro inteligente combinado: Nome E Status selecionado
  const examesFiltrados = listaExames.filter(item => {
    const bateNome = item.paciente.toLowerCase().includes(busca.toLowerCase());
    const bateStatus = statusFiltro === 'Todos' || item.status === statusFiltro;
    return bateNome && bateStatus;
  });

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-6">
      
      {/* Cabeçalho do Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Módulo de Exames</h2>
          <p className="text-sm text-gray-400 mt-1">Gerencie, filtre e emita laudos dos exames laboratoriais e gráficos.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#00bfa5] text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-md shadow-teal-100 hover:bg-[#00a892] transition-all transform active:scale-95 shrink-0"
        >
          <Plus size={18} />
          <span>Adicionar resultado</span>
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#00bfa5]">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Laudados Hoje</p>
            <p className="text-xl font-bold text-gray-800">12 exames</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Aguardando Laudo</p>
            <p className="text-xl font-bold text-gray-800">5 pendentes</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Casos Urgentes</p>
            <p className="text-xl font-bold text-gray-800">1 paciente</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#4ea8de]">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total do Mês</p>
            <p className="text-xl font-bold text-gray-800">148 exames</p>
          </div>
        </div>
      </div>

      {/* Caixa de Listagem com os Filtros Ativos */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-white flex flex-col gap-4">
        
        {/* Controles de Busca e Menu de Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 w-full relative">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar paciente pelo nome (ex: Ana, José)..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-200 transition-all text-gray-700"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowFiltroMenu(!showFiltroMenu)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 border px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${statusFiltro !== 'Todos' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
            >
              <Filter size={16} />
              <span>Status: {statusFiltro}</span>
            </button>

            {/* Menu Pop-over de seleção de filtros */}
            {showFiltroMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-30 animate-fadeIn">
                {['Todos', 'Concluído', 'Pendente', 'Em Análise'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => { setStatusFiltro(tipo); setShowFiltroMenu(false); }}
                    className={`w-full text-left px-4 py-2 text-sm ${statusFiltro === tipo ? 'bg-[#e2f5ff] text-[#1a535c] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chips indicadores do filtro ativo */}
        {(busca || statusFiltro !== 'Todos') && (
          <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400 pl-1">
            <span>Filtros aplicados:</span>
            {busca && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">Nome: "{busca}"</span>}
            {statusFiltro !== 'Todos' && <span className="bg-teal-50 text-teal-700 font-medium px-2 py-0.5 rounded-md">Status: {statusFiltro}</span>}
            <button onClick={() => { setBusca(''); setStatusFiltro('Todos'); }} className="text-blue-500 underline font-medium ml-1 hover:text-blue-600">Limpar</button>
          </div>
        )}

        {/* Tabela Modificada */}
        <div className="w-full overflow-x-auto rounded-xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-2">Paciente</th>
                <th className="py-3 px-2">Exame</th>
                <th className="py-3 px-2">Data Realização</th>
                <th className="py-3 px-2">Prioridade</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {examesFiltrados.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-2 font-semibold text-gray-800">{item.paciente}</td>
                  <td className="py-4 px-2 text-gray-500">{item.exame}</td>
                  <td className="py-4 px-2 text-gray-400">{item.data}</td>
                  <td className="py-4 px-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      item.prioridade === 'Urgente' ? 'bg-rose-50 text-rose-600' :
                      item.prioridade === 'Alta' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {item.prioridade}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' :
                      item.status === 'Pendente' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Concluído' ? 'bg-emerald-500' :
                        item.status === 'Pendente' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${item.status === 'Concluído' ? 'bg-gray-50 text-gray-400 hover:bg-gray-100' : 'bg-[#e2f5ff] text-[#1a535c] hover:bg-blue-100'}`}>
                      {item.status === 'Concluído' ? 'Ver Laudo' : 'Laudar'}
                    </button>
                  </td>
                </tr>
              ))}
              {examesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-400 italic bg-gray-50/30 rounded-xl">
                    Nenhum resultado corresponde à busca ou filtro selecionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[100] animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl mx-4 border border-gray-100">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Novo Resultado de Exame</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm font-semibold">✕</button>
            </div>
            
            <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Paciente</label>
                <input type="text" placeholder="Nome completo" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipo de Exame</label>
                  <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700">
                    <option>Eletrocardiograma</option>
                    <option>Teste Ergométrico</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prioridade</label>
                  <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700">
                    <option>Normal</option>
                    <option>Urgente</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl border border-gray-100 text-sm text-gray-500 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#00bfa5] text-white font-bold text-sm hover:bg-[#00a892]">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}