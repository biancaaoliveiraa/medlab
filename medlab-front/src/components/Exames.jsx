import React, { useState } from 'react';

export default function Exames() {
  const [modalAberto, setModalAberto] = useState(false);
  const [listaExames, setListaExames] = useState([
    { id: "#EX01", p: "Ana Paula Guimarães", e: "Teste Ergométrico", s: "Finalizado" },
    { id: "#EX02", p: "José Bezerra",        e: "Hemograma",         s: "Pendente"   },
    { id: "#EX03", p: "Luna Teixeira",       e: "Eletrocardiograma", s: "Em Aberto"  },
    { id: "#EX04", p: "Luciano Moraes",      e: "Colesterol",        s: "Finalizado" },
  ]);

  const [paciente,    setPaciente]    = useState('');
  const [exameNome,   setExameNome]   = useState('');
  const [status,      setStatus]      = useState('Pendente');
  const [confirmarId, setConfirmarId] = useState(null);

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!paciente || !exameNome) return;
    setListaExames([
      { id: `#EX${String(listaExames.length + 1).padStart(2, '0')}`, p: paciente, e: exameNome, s: status },
      ...listaExames,
    ]);
    setPaciente(''); setExameNome(''); setStatus('Pendente');
    setModalAberto(false);
  };

  const handleExcluir = (id) => {
    setListaExames(prev => prev.filter(ex => ex.id !== id));
    setConfirmarId(null);
  };

  const initials = (nome) => nome.split(' ').map(n => n[0]).slice(0, 2).join('');

  const StatusBadge = ({ s }) => {
    const map = {
      Finalizado:  { bg: '#E6FBF8', color: '#08D1BD', dot: '#08D1BD' },
      Pendente:    { bg: '#FFF8E6', color: '#D97706', dot: '#D97706' },
      'Em Aberto': { bg: '#E5F8FF', color: '#00405D', dot: '#5DBBE5' },
    };
    const st = map[s] || map['Em Aberto'];
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
        backgroundColor: st.bg, color: st.color, flexShrink: 0,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: st.dot, display: 'inline-block' }} />
        {s}
      </span>
    );
  };

  const Row = ({ exame }) => {
    const confirmando = confirmarId === exame.id;
    return (
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '11px 14px', borderBottom: '1px solid #F0FDFA',
          cursor: 'default', transition: 'background .12s',
          backgroundColor: confirmando ? '#FFF8F8' : 'transparent',
        }}
        onMouseEnter={e => { if (!confirmando) e.currentTarget.style.backgroundColor = '#F7FFFE'; }}
        onMouseLeave={e => { if (!confirmando) e.currentTarget.style.backgroundColor = confirmando ? '#FFF8F8' : 'transparent'; }}
      >
        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          backgroundColor: '#E5F8FF', color: '#08D1BD',
          fontSize: 10, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {initials(exame.p)}
        </div>

        {/* Nome */}
        <span style={{ width: 180, flexShrink: 0, fontSize: 13, fontWeight: 500, color: '#171717' }}>
          {exame.p}
        </span>

        {/* Exame */}
        <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: '#464646' }}>
          {exame.e}
        </span>

        {/* ID */}
        <span style={{ width: 60, flexShrink: 0, fontSize: 11, fontFamily: 'monospace', color: '#94A3B8', textAlign: 'right' }}>
          {exame.id}
        </span>

        {/* Status */}
        <StatusBadge s={exame.s} />

        {/* Excluir */}
        {confirmando ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: '#94A3B8', whiteSpace: 'nowrap' }}>Excluir?</span>
            <button
              onClick={() => handleExcluir(exame.id)}
              style={{ padding: '3px 10px', borderRadius: 8, border: 'none', backgroundColor: '#FDECEA', color: '#E53E3E', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
            >
              Sim
            </button>
            <button
              onClick={() => setConfirmarId(null)}
              style={{ padding: '3px 10px', borderRadius: 8, border: 'none', backgroundColor: '#E5F8FF', color: '#00405D', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
            >
              Não
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmarId(exame.id)}
            title="Excluir exame"
            style={{
              flexShrink: 0, width: 28, height: 28, borderRadius: 8,
              border: 'none', backgroundColor: 'transparent', color: '#CBD5E1',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FDECEA'; e.currentTarget.style.color = '#E53E3E'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#CBD5E1'; }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  const inputStyle = {
    width: '100%', padding: '8px 12px', border: '1px solid #E5F8FF',
    borderRadius: 10, backgroundColor: '#F7FFFE', fontSize: 12,
    color: '#374151', outline: 'none', fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = { fontSize: 11, fontWeight: 600, color: '#374151', marginBottom: 4, display: 'block' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#E5F8FF', fontFamily: "'Inter', sans-serif", padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Topo */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setModalAberto(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: '#08D1BD', color: '#fff', border: 'none',
            borderRadius: 12, padding: '7px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar exame
        </button>
      </div>

      {/* Lista */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8, paddingLeft: 2 }}>Exames</p>
        <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden' }}>
          {listaExames.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
              <p style={{ fontSize: 12, color: '#94A3B8' }}>Nenhum exame registrado</p>
            </div>
          ) : (
            listaExames.map((ex) => <Row key={ex.id} exame={ex} />)
          )}
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,64,93,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}
          onClick={e => { if (e.target === e.currentTarget) setModalAberto(false); }}
        >
          <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 400, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #E5F8FF' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#00405D' }}>Novo exame</p>
              <button onClick={() => setModalAberto(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8', fontSize: 16, lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>Nome do paciente</label>
                <input type="text" value={paciente} onChange={e => setPaciente(e.target.value)} placeholder="Ex: Carlos Silva" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Nome do exame</label>
                <input type="text" value={exameNome} onChange={e => setExameNome(e.target.value)} placeholder="Ex: Hemograma Completo" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
                  <option>Pendente</option>
                  <option>Em Aberto</option>
                  <option>Finalizado</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 4 }}>
              <button onClick={() => setModalAberto(false)} style={{ padding: '7px 14px', borderRadius: 10, border: 'none', backgroundColor: '#E5F8FF', color: '#00405D', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={handleSalvar} style={{ padding: '7px 14px', borderRadius: 10, border: 'none', backgroundColor: '#08D1BD', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  