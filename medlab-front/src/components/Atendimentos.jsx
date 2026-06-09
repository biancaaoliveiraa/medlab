import React, { useState, useRef, useEffect } from 'react';

export default function Atendimentos() {
  const dadosAgendamentos = [
    { hora: "08:00", nome: "João Silva",      cpf: "048.239.122-85", tipo: "Consulta de Rotina",   proc: "Colesterol Total",   status: "Finalizado", dia: 7,  mes: 5 },
    { hora: "09:15", nome: "Maria Gomes",     cpf: "702.411.903-44", tipo: "Consulta de Retorno",  proc: "Hemograma Completo", status: "Em Espera",  dia: 7,  mes: 5 },
    { hora: "10:30", nome: "Pedro Santos",    cpf: "122.904.382-10", tipo: "Consulta de Rotina",   proc: "Eletrocardiograma",  status: "Em Espera",  dia: 7,  mes: 5 },
    { hora: "14:00", nome: "Lucas Oliveira",  cpf: "334.102.887-55", tipo: "Avaliação Particular", proc: "Glicemia em Jejum",  status: "Agendado",   dia: 8,  mes: 5 },
    { hora: "08:30", nome: "Ana Beatriz",     cpf: "445.211.398-00", tipo: "Consulta de Rotina",   proc: "Ultrassonografia",   status: "Agendado",   dia: 12, mes: 5 },
    { hora: "11:00", nome: "Carlos Henrique", cpf: "998.102.344-11", tipo: "Consulta de Retorno",  proc: "Ecocardiograma",     status: "Finalizado", dia: 15, mes: 5 },
  ];

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const [mesIndex, setMesIndex]             = useState(5);
  const [ano, setAno]                       = useState(2026);
  const [diaSelecionado, setDiaSelecionado] = useState(7);
  const [buscaPaciente, setBuscaPaciente]   = useState('');
  const [modoFiltro, setModoFiltro]         = useState('dia');
  const [calAberto, setCalAberto]           = useState(false);
  const calRef                              = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (calRef.current && !calRef.current.contains(e.target)) setCalAberto(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const mesAnterior = () => { if (mesIndex === 0) { setMesIndex(11); setAno(a => a - 1); } else setMesIndex(m => m - 1); };
  const proximoMes  = () => { if (mesIndex === 11) { setMesIndex(0); setAno(a => a + 1); } else setMesIndex(m => m + 1); };

  const diasGrade = Array.from({ length: 30 }, (_, i) => i + 1);
  const pad = (n) => String(n).padStart(2, '0');

  const pacientesFiltrados = dadosAgendamentos.filter(p => {
    if (!p.nome.toLowerCase().includes(buscaPaciente.toLowerCase())) return false;
    if (p.mes !== mesIndex) return false;
    if (modoFiltro === 'dia')    return p.dia === diaSelecionado;
    if (modoFiltro === 'semana') return p.dia >= diaSelecionado && p.dia <= diaSelecionado + 6;
    return true;
  });

  const atendidos  = pacientesFiltrados.filter(p => p.status === 'Finalizado');
  const aguardando = pacientesFiltrados.filter(p => p.status !== 'Finalizado');

  const dataLabel = `${pad(diaSelecionado)}/${pad(mesIndex + 1)}/${ano}`;

  const initials = (nome) => nome.split(' ').map(n => n[0]).slice(0, 2).join('');

  const StatusBadge = ({ s }) => {
    const styles = {
      Finalizado:  { bg: '#E6FBF8', color: '#08D1BD', dot: '#08D1BD', label: 'Atendido' },
      'Em Espera': { bg: '#FFF8E6', color: '#D97706', dot: '#D97706', label: 'Em espera' },
      Agendado:    { bg: '#E5F8FF', color: '#00405D', dot: '#5DBBE5', label: 'Agendado' },
    };
    const st = styles[s] || styles['Agendado'];
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
        backgroundColor: st.bg, color: st.color, flexShrink: 0,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: st.dot, display: 'inline-block' }} />
        {st.label}
      </span>
    );
  };

  const Row = ({ p, dim }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 18px',
        borderBottom: '1px solid #F0FDFA',
        opacity: dim ? 0.45 : 1,
        cursor: 'default',
        transition: 'background .12s',
      }}
      onMouseEnter={e => { if (!dim) e.currentTarget.style.backgroundColor = '#F7FFFE'; }}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {/* Avatar */}
      <div style={{
        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
        backgroundColor: dim ? '#F1F5F9' : '#E5F8FF',
        color: dim ? '#94A3B8' : '#08D1BD',
        fontSize: 11, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {initials(p.nome)}
      </div>

      {/* Nome */}
      <span style={{ flex: '2 1 150px', minWidth: 0, fontSize: 14, fontWeight: 500, color: dim ? '#94A3B8' : '#171717' }}>
        {p.nome}
      </span>

      {/* CPF */}
      <span style={{ flex: '1 1 110px', minWidth: 0, fontSize: 12, fontFamily: 'monospace', color: '#94A3B8' }}>
        {p.cpf}
      </span>

      {/* Tipo */}
      <span style={{ flex: '2 1 140px', minWidth: 0, fontSize: 12, color: dim ? '#94A3B8' : '#464646' }}>
        {p.tipo}
      </span>

      {/* Procedimento */}
      <span style={{ flex: '2 1 130px', minWidth: 0, fontSize: 12, fontWeight: 500, color: dim ? '#94A3B8' : '#464646' }}>
        {p.proc}
      </span>

      {/* Hora */}
      <span style={{
        fontSize: 12, fontWeight: 600, padding: '3px 9px', borderRadius: 6, flexShrink: 0,
        backgroundColor: dim ? '#F1F5F9' : '#E5F8FF',
        color: dim ? '#94A3B8' : '#00405D',
      }}>
        {p.hora}
      </span>

      {/* Status */}
      <StatusBadge s={p.status} />
    </div>
  );

  const SectionTitle = ({ children }) => (
    <p style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginBottom: 8, paddingLeft: 2 }}>
      {children}
    </p>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#E5F8FF', fontFamily: "'Inter', sans-serif", padding: '20px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Barra de controles ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>

        {/* Filtros */}
        <div style={{ display: 'flex', backgroundColor: '#fff', borderRadius: 12, padding: 3, gap: 2 }}>
          {[['dia', 'Hoje'], ['semana', 'Esta semana'], ['mes', 'Mês todo']].map(([modo, label]) => (
            <button key={modo} onClick={() => setModoFiltro(modo)} style={{
              border: 'none', borderRadius: 9, padding: '5px 12px',
              fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all .15s',
              backgroundColor: modoFiltro === modo ? '#08D1BD' : 'transparent',
              color: modoFiltro === modo ? '#fff' : '#64748B',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Calendário */}
        <div style={{ position: 'relative' }} ref={calRef}>
          <button onClick={() => setCalAberto(o => !o)} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            backgroundColor: calAberto ? '#08D1BD' : '#fff',
            color: calAberto ? '#fff' : '#00405D',
            border: 'none', borderRadius: 12, padding: '6px 11px',
            fontSize: 11, fontWeight: 500, cursor: 'pointer',
          }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {dataLabel}
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {calAberto && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, marginTop: 8, zIndex: 50,
              backgroundColor: '#fff', borderRadius: 16, padding: 16, width: 268,
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <button onClick={mesAnterior} style={{ width: 24, height: 24, border: 'none', background: 'transparent', cursor: 'pointer', color: '#00405D', fontSize: 12 }}>&lt;</button>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#00405D' }}>{meses[mesIndex]} {ano}</span>
                <button onClick={proximoMes}  style={{ width: 24, height: 24, border: 'none', background: 'transparent', cursor: 'pointer', color: '#00405D', fontSize: 12 }}>&gt;</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 4 }}>
                {['D','S','T','Q','Q','S','S'].map((d, i) => (
                  <span key={i} style={{ fontSize: 9, fontWeight: 500, color: '#94A3B8', padding: '4px 0' }}>{d}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '2px 0' }}>
                <span style={{ padding: '6px 0', fontSize: 11, color: '#CBD5E1' }}>31</span>
                {diasGrade.map(dia => (
                  <span key={dia} onClick={() => { setDiaSelecionado(dia); if (modoFiltro !== 'semana') setModoFiltro('dia'); setCalAberto(false); }}
                    style={{
                      padding: '6px 0', fontSize: 11, borderRadius: 8, cursor: 'pointer', userSelect: 'none',
                      backgroundColor: dia === diaSelecionado ? '#08D1BD' : 'transparent',
                      color: dia === diaSelecionado ? '#fff' : '#374151',
                      fontWeight: dia === diaSelecionado ? 600 : 400,
                    }}>
                    {pad(dia)}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px solid #E5F8FF' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#08D1BD', display: 'inline-block' }} />
                <span style={{ fontSize: 10, color: '#94A3B8' }}>Selecionado: {dataLabel}</span>
              </div>
            </div>
          )}
        </div>

        {/* Busca */}
        <div style={{ position: 'relative', flex: 1, minWidth: 140 }}>
          <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#94A3B8" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar paciente..." value={buscaPaciente}
            onChange={e => setBuscaPaciente(e.target.value)}
            style={{ width: '100%', padding: '6px 10px 6px 28px', border: 'none', borderRadius: 12, backgroundColor: '#fff', fontSize: 11, color: '#374151', outline: 'none' }} />
        </div>
      </div>

      {/* ── Conteúdo ── */}
      {pacientesFiltrados.length === 0 ? (
        <div style={{ backgroundColor: '#fff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
          <p style={{ fontSize: 12, color: '#94A3B8' }}>Nenhum atendimento encontrado para este período</p>
        </div>
      ) : (
        <>
          {aguardando.length > 0 && (
            <div>
              <SectionTitle>A atender</SectionTitle>
              <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden' }}>
                {aguardando.map((p, i) => (
                  <Row key={i} p={p} dim={false} />
                ))}
              </div>
            </div>
          )}

          {atendidos.length > 0 && (
            <div>
              <SectionTitle>Já atendidos</SectionTitle>
              <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden' }}>
                {atendidos.map((p, i) => (
                  <Row key={i} p={p} dim={true} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      </div>
    </div>
  );
}
