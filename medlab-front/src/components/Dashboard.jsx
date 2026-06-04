import React from 'react';
import { User, Award, ShieldCheck, Clock, CheckCircle2, Calendar, FileText, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const medico = {
    nome: "Dr. Carlos Antônio",
    crm: "123456/SSA",
    especialidade: "Cardiologia & Eletrofisiologia",
    statusTurno: "Em plantão",
    hospital: "Unidade Central MedLab"
  };

  return (
    <div className="w-full flex flex-col gap-8 animate-fadeIn pt-4 pb-12">
      
      {/* SEÇÃO 1: Cartão de Identificação do Médico (Mais Espaçado) */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-all hover:shadow-md/50">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar Clínico */}
          <div className="w-16 h-16 rounded-2xl bg-[#e2f5ff] flex items-center justify-center text-[#1a535c] shrink-0 border border-blue-100 shadow-sm">
            <User size={30} className="stroke-[1.8]" />
          </div>
          
          {/* Dados de Registro */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">{medico.nome}</h2>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-emerald-100">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {medico.statusTurno}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Award size={16} className="text-[#4ea8de]" />
                <span className="text-gray-600 font-medium">{medico.especialidade}</span>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#00bfa5]" />
                <span>CRM: <strong className="text-gray-700 font-bold">{medico.crm}</strong></span>
              </span>
            </div>
          </div>
        </div>

        {/* Local de Trabalho Lateral */}
        <div className="flex items-center justify-between gap-5 bg-gray-50/70 p-5 rounded-2xl border border-gray-100 w-full lg:w-auto min-w-[280px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black tracking-widest text-gray-400 uppercase">Local de Trabalho</span>
            <span className="text-xs font-bold text-gray-700">{medico.hospital}</span>
          </div>
          <div className="flex flex-col items-center shrink-0 bg-white border border-gray-200/80 rounded-xl px-3.5 py-2 shadow-sm">
            <span className="text-[8px] font-black text-gray-400 tracking-wider">SALA</span>
            <span className="text-xl font-black text-[#1a535c] leading-none mt-0.5">10</span>
          </div>
        </div>

      </div>

      {/* SEÇÃO 2: Grid de Métricas Unificado (Layout de 4 Colunas Fluido) */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
          Resumo Operacional de Hoje
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          {/* Card 1: Atendidos */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-white hover:shadow-md transition-all group">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-[#4ea8de] flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              <CheckCircle2 size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-800 leading-tight">7</span>
              <span className="text-xs font-bold text-gray-700 mt-0.5">Atendidos</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Pacientes finalizados</span>
            </div>
          </div>

          {/* Card 2: Agendados */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-white hover:shadow-md transition-all group">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-teal-50 text-[#00bfa5] flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              <Calendar size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-800 leading-tight">15</span>
              <span className="text-xs font-bold text-gray-700 mt-0.5">Agendados</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Lista total do dia</span>
            </div>
          </div>

          {/* Card 3: Laudados */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-white hover:shadow-md transition-all group">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              <FileText size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-800 leading-tight">3</span>
              <span className="text-xs font-bold text-gray-700 mt-0.5">Laudados</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Resultados assinados</span>
            </div>
          </div>

          {/* Card 4: Pendentes */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-white hover:shadow-md transition-all group">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              <AlertCircle size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-800 leading-tight">12</span>
              <span className="text-xs font-bold text-gray-700 mt-0.5">Pendentes</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Aguardando revisão</span>
            </div>
          </div>

        </div>
      </div>

      {/* SEÇÃO 3: Informativo Sincronização Rodapé */}
      <div className="bg-white/40 border border-white/60 rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-400 mt-2">
        <div className="flex items-center gap-2.5">
          <Clock size={14} className="text-gray-400" />
          <span>Última sincronização com a base de dados central: <strong className="text-gray-500 font-semibold">Agora mesmo</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          <span>Sessão médica ativa segura</span>
        </div>
      </div>

    </div>
  );
}