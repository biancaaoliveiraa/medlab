import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E5F8FF', fontFamily: "'Inter', sans-serif" }}>

      <main className="flex-1 px-5 pb-8 flex flex-col pt-5">

        {/* Perfil do Médico */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
            style={{ backgroundColor: '#08D1BD' }}
          >
            CA
          </div>
          <div>
            <p className="text-xs" style={{ color: '#08D1BD' }}>Bem-vindo</p>
            <h1 className="text-base font-semibold" style={{ color: '#00405D' }}>Dr. Carlos Antônio</h1>
            <p className="text-xs mt-0.5" style={{ color: '#464646' }}>
              Cardiologista &nbsp;·&nbsp; CRM 12345 &nbsp;·&nbsp; BA
            </p>
          </div>
        </div>

        {/* Sala de Atendimento */}
        <div className="flex flex-col items-center mb-9">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#00405D' }}>
            Sala de Atendimento
          </p>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-light"
            style={{ border: '1.5px solid #5DBBE5', color: '#171717', backgroundColor: '#E5F8FF' }}
          >
            10
          </div>
        </div>

        {/* Consultas */}
        <div className="mb-5">
          <p className="text-sm font-medium mb-3" style={{ color: '#171717' }}>Consultas</p>

          <div className="rounded-2xl p-4 flex items-center gap-4 mb-2" style={{ backgroundColor: '#FFFFFF' }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
              style={{ backgroundColor: '#08D1BD' }}
            >
              7
            </div>
            <span className="text-sm" style={{ color: '#464646' }}>Pacientes Atendidos</span>
          </div>

          <div className="rounded-2xl p-4 flex items-center gap-4" style={{ backgroundColor: '#FFFFFF' }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
              style={{ backgroundColor: '#08D1BD' }}
            >
              15
            </div>
            <span className="text-sm" style={{ color: '#464646' }}>Agendamentos para hoje</span>
          </div>
        </div>

        {/* Exames */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: '#171717' }}>Exames</p>

          <div className="rounded-2xl p-4 flex items-center gap-4 mb-2" style={{ backgroundColor: '#FFFFFF' }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
              style={{ backgroundColor: '#08D1BD' }}
            >
              3
            </div>
            <span className="text-sm" style={{ color: '#464646' }}>Pacientes Atendidos</span>
          </div>

          <div className="rounded-2xl p-4 flex items-center gap-4" style={{ backgroundColor: '#FFFFFF' }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
              style={{ backgroundColor: '#08D1BD' }}
            >
              12
            </div>
            <span className="text-sm" style={{ color: '#464646' }}>Agendamentos para hoje</span>
          </div>
        </div>

      </main>
    </div>
  );
}
