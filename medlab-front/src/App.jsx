import { useState, useRef } from 'react'
import { UserCheck, Activity, HeartPulse, User, BriefcaseMedical, Menu, ArrowLeft, ChevronRight, Calendar, ClipboardList, Search, LogOut, ShieldAlert, Droplet, TestTube, Stethoscope, Beaker, Sparkles, Heart, Home, Bell, Bone, Clock, Plus, X } from 'lucide-react'
import './App.css'
import LoginAdministrador from "./pages/LoginAdministrador/LoginAdministrador";
import PainelAdministrador from "./pages/PainelAdministrador/PainelAdministrador";
import UsuariosLista from "./pages/Usuarios/UsuariosLista";
import UsuarioEditar from "./pages/Usuarios/UsuarioEditar";
import MedicosLista from "./pages/Medicos/MedicosLista";
import MedicoCadastro from "./pages/Medicos/MedicoCadastro";
import MedicoEditar from "./pages/Medicos/MedicoEditar";
import ConveniosLista from "./pages/Convenios/ConveniosLista";
import ConvenioCadastro from "./pages/Convenios/ConvenioCadastro";
import ConvenioEditar from "./pages/Convenios/ConvenioEditar";
import Relatorios from "./pages/Relatorios/Relatorios"; 


function App() {
    const [currentScreen, setCurrentScreen] = useState('landing');
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [cadastroStep, setCadastroStep] = useState(1);
    const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);
    const [atendimentosTab, setAtendimentosTab] = useState('proximos');

    const [especialistaSelecionado, setEspecialistaSelecionado] = useState(null);
    const [isConsultaFocused, setIsConsultaFocused] = useState(false);
    const [isExameFocused, setIsExameFocused] = useState(false);
    const [searchConsulta, setSearchConsulta] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [adminItemId, setAdminItemId] = useState(null);

    const [agendamentos, setAgendamentos] = useState([
        { id: 1, tipo: 'Consulta', especialidade: 'Cardiologista', data: '10/05/2026', hora: '14:30', status: 'Pendente' },
        { id: 2, tipo: 'Exame', especialidade: 'Dermatoscopia', data: '12/05/2026', hora: '08:00', status: 'Pendente' }
    ]);

    const [exclusaoSucesso, setExclusaoSucesso] = useState(false);
    const [erroLogin, setErroLogin] = useState('');
    const [dataSelecionada, setDataSelecionada] = useState('Qua, 03 Jun');
    const [horaSelecionada, setHoraSelecionada] = useState(null);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false);
    const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
    const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState(null);
    const [codigoConfirmacao, setCodigoConfirmacao] = useState(new Array(6).fill(''));
    const [erroCodigo, setErroCodigo] = useState('');

    const [loginData, setLoginData] = useState({
        email: '',
        senha: ''
    });

    const [enderecoData, setEnderecoData] = useState({
        cep: '01311-200',
        logradouro: 'Avenida Paulista',
        numero: '1578',
        complemento: 'Apto 42',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP'
    });

    const [formData, setFormData] = useState({
        nomeCompleto: '',
        dataNascimento: '',
        cpf: '',
        telefone: '',
        email: '',
        confirmarEmail: '',
        senha: '',
        confirmarSenha: '',
        meioConfirmacao: '',
        tipoConvenio: '',
        aceitouTermos: false,
        anamnese: {
            possuiDoencaCronica: '',
            doencaCronicaDetalhe: '',
            medicamentosContinuos: '',
            medicamentosDetalhe: '',
            possuiAlergias: '',
            alergiasDetalhe: '',
            realizouCirurgias: '',
            cirurgiasDetalhe: '',
            tipoSanguineo: ''
        }
    });

    const inputRefs = useRef([]);
    const carouselRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const suggestionsCarouselRef = useRef(null);
    const isSugDown = useRef(false);
    const sugStartX = useRef(0);
    const sugScrollLeft = useRef(0);


    const handleFinalizarCadastro = async (dadosCompletosdoFront) => {
        try {
            const response = await fetch('http://localhost:8080/api/pacientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosCompletosdoFront)
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                setCurrentScreen('login');
            } else {
                alert('Erro ao realizar cadastro. Verifique os dados.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleConfirmarExclusaoDireta = async () => {
        if (!usuarioLogado?.id) return;

        try {
            const response = await fetch(`http://localhost:8080/api/pacientes/${usuarioLogado.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUsuarioLogado(null);
                setCadastroStep(1);
                setCurrentScreen('landing');
            } else {
                alert('Não foi possível excluir a conta no momento.');
            }
        } catch (error) {
            console.error('Erro ao deletar conta:', error);
        }
    };

    const handleAdicionarAgendamento = async (novoAgendamento) => {
        if (!usuarioLogado?.id) return;

        try {
            const response = await fetch(`http://localhost:8080/api/pacientes/${usuarioLogado.id}/agendamentos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoAgendamento)
            });

            if (response.ok) {
                const resList = await fetch(`http://localhost:8080/api/pacientes/${usuarioLogado.id}/agendamentos`);
                const listaAtualizada = await resList.json();
                setAgendamentos(listaAtualizada);
            }
        } catch (error) {
            console.error('Erro ao agendar:', error);
        }
    };

    const handleApagarAgendamento = async (agendamentoId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pacientes/agendamentos/${agendamentoId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setAgendamentos(prev => prev.filter(item => item.id !== agendamentoId));
            }
        } catch (error) {
            console.error('Erro ao remover agendamento:', error);
        }
    };

    const handleSalvarEnderecoSubmit = async (e) => {
        e.preventDefault();
        if (!usuarioLogado?.id) return;

        try {
            const response = await fetch(`http://localhost:8080/api/pacientes/${usuarioLogado.id}/endereco`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enderecoData)
            });

            if (response.ok) {
                const pacienteAtualizado = await response.json();
                setUsuarioLogado(pacienteAtualizado);
                alert('Endereço atualizado com sucesso!');
                setCurrentScreen('perfil');
            }
        } catch (error) {
            console.error('Erro ao salvar endereço:', error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErroLogin('');

        try {
            const response = await fetch('http://localhost:8080/api/pacientes/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const dadosPaciente = await response.json();
                setUsuarioLogado(dadosPaciente);
                setCurrentScreen('painel-paciente');
            } else {
                const mensagemErro = await response.text();
                setErroLogin(mensagemErro);
                alert(mensagemErro);
            }
        } catch (error) {
            console.error(error);
            setErroLogin('Não foi possível conectar ao servidor para validar o login.');
        }
    };

    const handleLogout = () => {
        setUsuarioLogado(null);
        setCadastroStep(1);
        setCurrentScreen('landing');
    };


    const handleEnderecoInputChange = (e) => {
        const { name, value } = e.target;
        setEnderecoData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmarAgendamento = () => {
        if (!dataSelecionada || !horaSelecionada) {
            alert("Por favor, selecione a data e o horário do agendamento.");
            return;
        }

        const novoItem = {
            id: Date.now(),
            tipo: isConsultaFocused ? 'Consulta' : 'Exame',
            especialidade: especialistaSelecionado || 'Geral',
            data: dataSelecionada,
            hora: horaSelecionada,
            status: 'Pendente'
        };

        setAgendamentos(prev => [novoItem, ...prev]);
        setMostrarModalConfirmacao(false);
        setCurrentScreen('atendimentos');

        setDataSelecionada('');
        setHoraSelecionada(null);
        setEspecialistaSelecionado(null);
    };

    const formatarNomeSaudacao = (nomeCompleto) => {
        if (!nomeCompleto) return 'Paciente';
        const primeiroNome = nomeCompleto.trim().split(' ')[0];
        return primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
    };

    const verificarDuplicidadeNoBanco = async (dados) => {
        try {
            const response = await fetch('http://localhost:8080/api/pacientes');
            if (response.ok) {
                const listaPacientes = await response.json();
                const cpfExiste = listaPacientes.some(p => p.cpf === dados.cpf);
                const telefoneExiste = listaPacientes.some(p => p.telefone === dados.telefone);
                const emailExiste = listaPacientes.some(p => p.email === dados.email);

                if (cpfExiste) return "Já existe um usuário cadastrado com este CPF.";
                if (telefoneExiste) return "Já existe um usuário cadastrado com este Telefone.";
                if (emailExiste) return "Já existe um usuário cadastrado com este E-mail.";
            }
            return null;
        } catch (error) {
            return null;
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let inputValue = type === 'checkbox' ? checked : value;

        if (name === 'cpf') {
            let numeros = value.replace(/\D/g, '');
            if (numeros.length > 11) numeros = numeros.slice(0, 11);
            if (numeros.length <= 3) inputValue = numeros;
            else if (numeros.length <= 6) inputValue = numeros.replace(/^(\d{3})(\d{1,3})/, '$1.$2');
            else if (numeros.length <= 9) inputValue = numeros.replace(/^(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
            else inputValue = numeros.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        }

        if (name === 'telefone') {
            let numeros = value.replace(/\D/g, '');
            if (numeros.length > 11) numeros = numeros.slice(0, 11);
            if (numeros.length > 10) inputValue = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            else if (numeros.length > 6) inputValue = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            else if (numeros.length > 2) inputValue = numeros.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
            else if (numeros.length > 0) inputValue = numeros.replace(/^(\d{0,2})/, '($1');
        }

        setFormData(prev => ({ ...prev, [name]: inputValue }));
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleCodigoChange = (element, index) => {
        const value = element.value.replace(/\D/g, "");
        if (!value) {
            const novoCodigo = [...codigoConfirmacao];
            novoCodigo[index] = '';
            setCodigoConfirmacao(novoCodigo);
            return;
        }
        const novoCodigo = [...codigoConfirmacao];
        novoCodigo[index] = value.substring(value.length - 1);
        setCodigoConfirmacao(novoCodigo);
        if (index < 5) inputRefs.current[index + 1].focus();
    };

    const handleCodigoKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !codigoConfirmacao[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleValidaCodigoSubmit = (e) => {
        e.preventDefault();
        if (codigoConfirmacao.join("") === "123456") {
            setErroCodigo("");
            setCadastroStep(5);
        } else {
            setErroCodigo("Código de verificação incorreto. Tente novamente.");
        }
    };

    const handleAnamneseChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            anamnese: { ...prev.anamnese, [name]: value }
        }));
    };

    const handleCadastroFinalSubmit = () => {
        if (formData.senha !== formData.confirmarSenha) { alert('As senhas digitadas não coincidem!'); return; }
        if (formData.email !== formData.confirmarEmail) { alert('Os e-mails digitados não coincidem!'); return; }
        enviarDadosAoBackend();
    };

    const enviarDadosAoBackend = async () => {
        const msgErroDuplicado = await verificarDuplicidadeNoBanco(formData);
        if (msgErroDuplicado) { alert(msgErroDuplicado); return; }

        try {
            const dadosParaEnviar = {
                nomeCompleto: formData.nomeCompleto,
                cpf: formData.cpf,
                dataNascimento: formData.dataNascimento,
                telefone: formData.telefone,
                email: formData.email,
                senha: formData.senha,
                tipoConvenio: formData.tipoConvenio,
                anamnese: {
                    sintomasAtuais: formData.anamnese.doencaCronicaDetalhe || "Nenhuma",
                    historicoDoencas: `Doença Crônica: ${formData.anamnese.possuiDoencaCronica} | Cirurgias: ${formData.anamnese.realizouCirurgias} | Tipo Sanguíneo: ${formData.anamnese.tipoSanguineo}`,
                    medicamentosEmUso: formData.anamnese.medicamentosDetalhe || "Nenhum",
                    alergias: formData.anamnese.alergiasDetalhe || "Nenhum"
                }
            };

            const response = await fetch('http://localhost:8080/api/pacientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (response.ok) setCadastroStep(7);
            else alert('Erro ao realizar o cadastro.');
        } catch (error) {
            alert('Não foi possível se conectar ao servidor.');
        }
    };

    const voltarPassoCadastro = () => {
        if (cadastroStep > 1) setCadastroStep(cadastroStep - 1);
        else setCurrentScreen('landing');
    };

    const handleMouseDown = (e) => {
        isDown.current = true;
        carouselRef.current.classList.add('active');
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };
    const handleMouseLeave = () => { isDown.current = false; };
    const handleMouseUp = () => { isDown.current = false; };
    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleSugMouseDown = (e) => {
        isSugDown.current = true;
        suggestionsCarouselRef.current.classList.add('active');
        sugStartX.current = e.pageX - suggestionsCarouselRef.current.offsetLeft;
        sugScrollLeft.current = suggestionsCarouselRef.current.scrollLeft;
    };
    const handleSugMouseLeave = () => { isSugDown.current = false; };
    const handleSugMouseUp = () => { isSugDown.current = false; };
    const handleMouseMoveSug = (e) => {
        if (!isSugDown.current) return;
        e.preventDefault();
        const x = e.pageX - suggestionsCarouselRef.current.offsetLeft;
        const walk = (x - sugStartX.current) * 1.5;
        suggestionsCarouselRef.current.scrollLeft = sugScrollLeft.current - walk;
    };

    const inputStyleWithShadow = {
        boxShadow: '0px 5px 16px rgba(0, 0, 0, 0.09)',
        border: 'none',
        outline: 'none'
    };

    const listaNotificacoesMock = [
        { id: 1, texto: "Seu exame de Hemograma Completo já está pronto para visualização.", lida: false, icone: <Droplet size={18} /> },
        { id: 2, texto: "Lembrete: Sua consulta com o Clínico Geral está agendada para amanhã às 14:00.", lida: false, icone: <Stethoscope size={18} /> },
        { id: 3, texto: "Dr. Carlos updated suas recomendações na anamnese clínica.", lida: true, icone: <HeartPulse size={18} /> }
    ];

    const especialistasMock = [
        "Cardiologista", "Clínico Geral", "Dermatologista", "Endocrinologista",
        "Ginecologista", "Neurologista", "Oftalmologista", "Ortopedista", "Psiquiatra"
    ];

    const filteredEspecialistas = especialistasMock.filter(item =>
        item.toLowerCase().includes(searchFilter.toLowerCase())
    );

    const menuLinkStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' };
    const anamneseCardStyle = { backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box', textAlign: 'left' };


    if (currentScreen === 'cadastro-paciente') {
        return (
            <div className="login-screen-clean-container" style={{ padding: '60px 20px', height: 'auto', minHeight: '100vh', overflowY: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={voltarPassoCadastro} className="btn-voltar-topo-esquerdo">
                    <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                </button>

                <div className="login-clean-wrapper" style={{ maxWidth: cadastroStep === 6 ? '600px' : '440px', width: '100%', transition: 'max-width 0.3s ease', height: 'auto', boxSizing: 'border-box', margin: '0 auto' }}>
                    <div className="login-logo-centered-box">
                        <img src="/logo-medlab.png" alt="MedLab Logo" className="login-logo-circle-img" />
                    </div>

                    {cadastroStep === 1 && (
                        <form className="login-form-clean" onSubmit={(e) => { e.preventDefault(); setCadastroStep(2); }}>
                            <div className="input-field-group-clean">
                                <label>Nome Completo:</label>
                                <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleInputChange} placeholder="Digite seu nome" required style={inputStyleWithShadow} />
                            </div>
                            <div className="input-field-group-clean">
                                <label>Data de Nascimento:</label>
                                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleInputChange} required style={{ ...inputStyleWithShadow, color: '#666' }} />
                            </div>
                            <div className="input-field-group-clean">
                                <label>CPF:</label>
                                <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" required style={inputStyleWithShadow} />
                            </div>
                            <div className="input-field-group-clean">
                                <label>Telefone:</label>
                                <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} placeholder="(00) 00000-0000" required style={inputStyleWithShadow} />
                            </div>
                            <button type="submit" className="btn-login-submit-final">Próximo</button>
                        </form>
                    )}

                    {cadastroStep === 2 && (
                        <form className="login-form-clean" onSubmit={(e) => {
                            e.preventDefault();
                            if (formData.email !== formData.confirmarEmail) { alert('Os e-mails não coincidem!'); return; }
                            if (formData.senha !== formData.confirmarSenha) { alert('As senhas não coincidem!'); return; }
                            setCadastroStep(3);
                        }}>
                            <div className="input-field-group-clean">
                                <label>E-mail:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Digite seu e-mail" required style={inputStyleWithShadow} />
                            </div>
                            <div className="input-field-group-clean">
                                <label>Confirmar e-mail:</label>
                                <input type="email" name="confirmarEmail" value={formData.confirmarEmail} onChange={handleInputChange} placeholder="Digite seu e-mail" required style={inputStyleWithShadow} />
                            </div>
                            <div className="input-field-group-clean">
                                <label>Senha:</label>
                                <input type="password" name="senha" value={formData.senha} onChange={handleInputChange} placeholder="********" required minLength="6" style={inputStyleWithShadow} />
                            </div>
                            <div className="input-field-group-clean">
                                <label>Confirmar senha:</label>
                                <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleInputChange} placeholder="********" required minLength="6" style={inputStyleWithShadow} />
                            </div>
                            <button type="submit" className="btn-login-submit-final">Próximo</button>
                        </form>
                    )}

                    {cadastroStep === 3 && (
                        <form className="login-form-clean" onSubmit={(e) => { e.preventDefault(); setCadastroStep(4); }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>Código de confirmação</h3>
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '25px' }}>Escolha onde deseja receber o código de verificação.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '35px', paddingLeft: '5px' }}>
                                {['WhatsApp', 'E-mail', 'SMS'].map((option) => (
                                    <label key={option} className="medlab-custom-radio-container">
                                        <input type="radio" name="meioConfirmacao" value={option} checked={formData.meioConfirmacao === option} onChange={handleInputChange} required />
                                        <span className="medlab-radio-checkmark"></span>
                                        <span className="medlab-radio-label-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                            <button type="submit" className="btn-login-submit-final">Próximo</button>
                        </form>
                    )}

                    {cadastroStep === 4 && (
                        <form className="login-form-clean" onSubmit={handleValidaCodigoSubmit}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>Código de confirmação</h3>
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '30px' }}>Insira abaixo seu código de verificação</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '15px' }}>
                                {codigoConfirmacao.map((num, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        maxLength="1"
                                        required
                                        value={num}
                                        ref={(el) => (inputRefs.current[idx] = el)}
                                        onChange={(e) => handleCodigoChange(e.target, idx)}
                                        onKeyDown={(e) => handleCodigoKeyDown(e, idx)}
                                        style={{ width: '100%', height: '50px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', border: '1.5px solid #000000', borderRadius: '10px', background: '#fff', outline: 'none' }}
                                    />
                                ))}
                            </div>
                            {erroCodigo && <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '20px', fontWeight: 'bold' }}>{erroCodigo}</p>}
                            <button type="submit" className="btn-login-submit-final">Próximo</button>
                        </form>
                    )}

                    {cadastroStep === 5 && (
                        <form className="login-form-clean" onSubmit={(e) => { e.preventDefault(); setCadastroStep(6); }}>
                            <div className="input-field-group-clean" style={{ marginBottom: '25px' }}>
                                <label>Convênio:</label>
                                <select name="tipoConvenio" value={formData.tipoConvenio} onChange={handleInputChange} required style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#fff', fontSize: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)', outline: 'none' }}>
                                    <option value="" disabled>Selecione uma opção:</option>
                                    <option value="Particular">Particular (Sem convênio)</option>
                                    <option value="Amil">Amil</option>
                                    <option value="Bradesco">Bradesco Saúde</option>
                                    <option value="Hapvida">Hapvida</option>
                                    <option value="Planserv">Planserv</option>
                                    <option value="Promedica">Promédica</option>
                                    <option value="Sulamerica">SulAmérica</option>
                                    <option value="Unimed">Unimed</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '35px' }}>
                                <label className="medlab-custom-checkbox-container">
                                    <input type="checkbox" name="aceitouTermos" checked={formData.aceitouTermos} onChange={handleInputChange} required />
                                    <span className="medlab-checkbox-checkmark"></span>
                                    <span className="medlab-checkbox-label-text" style={{ fontSize: '14px', fontWeight: '500' }}>Li e aceito os termos</span>
                                </label>
                            </div>
                            <button type="submit" className="btn-login-submit-final" disabled={!formData.aceitouTermos} style={{ backgroundColor: formData.aceitouTermos ? '#00bfa5' : '#b2dfdb', opacity: formData.aceitouTermos ? 1 : 0.6, cursor: formData.aceitouTermos ? 'pointer' : 'not-allowed' }}>Próximo</button>
                        </form>
                    )}

                    {cadastroStep === 6 && (
                        <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '6px' }}>Teste de Anamnese</h3>
                            <p style={{ fontSize: '15px', fontWeight: '500', color: '#666', marginBottom: '35px' }}>Vamos cuidar melhor de você?</p>
                            <form className="login-form-clean" onSubmit={(e) => { e.preventDefault(); handleCadastroFinalSubmit(); }} style={{ width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px', width: '100%' }}>
                                    <div style={anamneseCardStyle}>
                                        <label style={{ fontWeight: '600', color: '#000', fontSize: '17px', display: 'block', marginBottom: '14px' }}>1. Você possui alguma doença crônica?</label>
                                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="possuiDoencaCronica" value="Sim" checked={formData.anamnese.possuiDoencaCronica === 'Sim'} onChange={handleAnamneseChange} required />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Sim. Qual?</span>
                                            </label>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="possuiDoencaCronica" value="Não" checked={formData.anamnese.possuiDoencaCronica === 'Não'} onChange={handleAnamneseChange} />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Não.</span>
                                            </label>
                                        </div>
                                        {formData.anamnese.possuiDoencaCronica === 'Sim' && (
                                            <input type="text" name="doencaCronicaDetalhe" value={formData.anamnese.doencaCronicaDetalhe} onChange={handleAnamneseChange} placeholder="Digite aqui..." required style={{ ...inputStyleWithShadow, width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#fff', fontSize: '15px', boxSizing: 'border-box', border: '1px solid #cbd5e1', marginTop: '8px' }} />
                                        )}
                                    </div>

                                    <div style={anamneseCardStyle}>
                                        <label style={{ fontWeight: '600', color: '#000', fontSize: '17px', display: 'block', marginBottom: '14px' }}>2. Faz uso de medicamentos contínuos?</label>
                                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="medicamentosContinuos" value="Sim" checked={formData.anamnese.medicamentosContinuos === 'Sim'} onChange={handleAnamneseChange} required />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Sim. Qual(is)?</span>
                                            </label>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="medicamentosContinuos" value="Não" checked={formData.anamnese.medicamentosContinuos === 'Não'} onChange={handleAnamneseChange} />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Não.</span>
                                            </label>
                                        </div>
                                        {formData.anamnese.medicamentosContinuos === 'Sim' && (
                                            <input type="text" name="medicamentosDetalhe" value={formData.anamnese.medicamentosDetalhe} onChange={handleAnamneseChange} placeholder="Digite aqui..." required style={{ ...inputStyleWithShadow, width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#fff', fontSize: '15px', boxSizing: 'border-box', border: '1px solid #cbd5e1', marginTop: '8px' }} />
                                        )}
                                    </div>

                                    <div style={anamneseCardStyle}>
                                        <label style={{ fontWeight: '600', color: '#000', fontSize: '17px', display: 'block', marginBottom: '14px' }}>3. Possui alergias?</label>
                                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="possuiAlergias" value="Sim" checked={formData.anamnese.possuiAlergias === 'Sim'} onChange={handleAnamneseChange} required />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Sim. Qual(is)?</span>
                                            </label>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="possuiAlergias" value="Não" checked={formData.anamnese.possuiAlergias === 'Não'} onChange={handleAnamneseChange} />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Não.</span>
                                            </label>
                                        </div>
                                        {formData.anamnese.possuiAlergias === 'Sim' && (
                                            <input type="text" name="alergiasDetalhe" value={formData.anamnese.alergiasDetalhe} onChange={handleAnamneseChange} placeholder="Digite aqui..." required style={{ ...inputStyleWithShadow, width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#fff', fontSize: '15px', boxSizing: 'border-box', border: '1px solid #cbd5e1', marginTop: '8px' }} />
                                        )}
                                    </div>

                                    <div style={anamneseCardStyle}>
                                        <label style={{ fontWeight: '600', color: '#000', fontSize: '17px', display: 'block', marginBottom: '14px' }}>4. Já realizou cirurgias?</label>
                                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="realizouCirurgias" value="Sim" checked={formData.anamnese.realizouCirurgias === 'Sim'} onChange={handleAnamneseChange} required />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Sim. Qual?</span>
                                            </label>
                                            <label className="medlab-custom-radio-container">
                                                <input type="radio" name="realizouCirurgias" value="Não" checked={formData.anamnese.realizouCirurgias === 'Não'} onChange={handleAnamneseChange} />
                                                <span className="medlab-radio-checkmark"></span>
                                                <span className="medlab-radio-label-text">Não.</span>
                                            </label>
                                        </div>
                                        {formData.anamnese.realizouCirurgias === 'Sim' && (
                                            <input type="text" name="cirurgiasDetalhe" value={formData.anamnese.cirurgiasDetalhe} onChange={handleAnamneseChange} placeholder="Digite aqui..." required style={{ ...inputStyleWithShadow, width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#fff', fontSize: '15px', boxSizing: 'border-box', border: '1px solid #cbd5e1', marginTop: '8px' }} />
                                        )}
                                    </div>

                                    <div style={anamneseCardStyle}>
                                        <label style={{ fontWeight: '600', color: '#000', fontSize: '17px', display: 'block', marginBottom: '16px' }}>5. Qual seu tipo sanguíneo?</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '14px 10px', width: '100%' }}>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Rh Nulo', 'Não sei'].map((tipo) => (
                                                <label key={tipo} className="medlab-custom-radio-container">
                                                    <input type="radio" name="tipoSanguineo" value={tipo} checked={formData.anamnese.tipoSanguineo === tipo} onChange={handleAnamneseChange} required />
                                                    <span className="medlab-radio-checkmark"></span>
                                                    <span className="medlab-radio-label-text" style={{ fontSize: '14px', fontWeight: '500' }}>{tipo}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn-login-submit-final">Finalizar Cadastro</button>
                            </form>
                        </div>
                    )}

                    {cadastroStep === 7 && (
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>Cadastro realizado com sucesso!</h3>
                            <p style={{ fontSize: '14px', color: '#555', marginBottom: '40px' }}>Clique no botão abaixo para continuar</p>
                            <button onClick={() => setCurrentScreen('login-paciente')} style={{ width: '100%', padding: '14px', background: '#fff', color: '#333', border: '1px solid #dcdcdc', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', marginBottom: '14px', cursor: 'pointer' }}>Acessar o system</button>
                            <button onClick={() => { setCadastroStep(1); setCurrentScreen('landing'); }} className="btn-login-submit-final">Voltar ao Menu</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
if (currentScreen === "login-administrador") {
  return <LoginAdministrador setCurrentScreen={setCurrentScreen} />;
}

if (currentScreen === "painel-administrador") {
  return <PainelAdministrador setCurrentScreen={setCurrentScreen} />;
}

if (currentScreen === "usuarios") {
  return (
    <UsuariosLista
      setCurrentScreen={setCurrentScreen}
      setAdminItemId={setAdminItemId}
    />
  );
}

if (currentScreen === "usuarios-editar") {
  return (
    <UsuarioEditar
      setCurrentScreen={setCurrentScreen}
      adminItemId={adminItemId}
    />
  );
}

if (currentScreen === "medicos") {
  return (
    <MedicosLista
      setCurrentScreen={setCurrentScreen}
      setAdminItemId={setAdminItemId}
    />
  );
}

if (currentScreen === "medicos-cadastro") {
  return <MedicoCadastro setCurrentScreen={setCurrentScreen} />;
}

if (currentScreen === "medicos-editar") {
  return (
    <MedicoEditar
      setCurrentScreen={setCurrentScreen}
      adminItemId={adminItemId}
    />
  );
}

if (currentScreen === "convenios") {
  return (
    <ConveniosLista
      setCurrentScreen={setCurrentScreen}
      setAdminItemId={setAdminItemId}
    />
  );
}

if (currentScreen === "convenios-cadastro") {
  return <ConvenioCadastro setCurrentScreen={setCurrentScreen} />;
}

if (currentScreen === "convenios-editar") {
  return (
    <ConvenioEditar
      setCurrentScreen={setCurrentScreen}
      adminItemId={adminItemId}
    />
  );
}

if (currentScreen === "relatorios") {
  return <Relatorios setCurrentScreen={setCurrentScreen} />;
}
    if (currentScreen === 'login-paciente') {
        return (
            <div className="login-screen-clean-container">
                <button onClick={() => setCurrentScreen('landing')} className="btn-voltar-topo-esquerdo">
                    <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                </button>
                <div className="login-clean-wrapper">
                    <div className="login-logo-centered-box">
                        <img src="/logo-medlab.png" alt="MedLab Logo" className="login-logo-circle-img" />
                    </div>
                    <h2>Login do Paciente</h2>
                    {erroLogin && (
                        <p style={{ color: '#dc2626', fontSize: '14px', marginBottom: '15px', fontWeight: '500', textAlign: 'center' }}>
                            {erroLogin}
                        </p>
                    )}
                    <form className="login-form-clean" onSubmit={handleLoginSubmit}>
                        <div className="input-field-group-clean">
                            <label>E-mail:</label>
                            <input type="email" name="email" value={loginData.email} onChange={handleLoginInputChange} placeholder="Digite seu e-mail" required style={inputStyleWithShadow} />
                        </div>
                        <div className="input-field-group-clean">
                            <label>Senha:</label>
                            <input type="password" name="senha" value={loginData.senha} onChange={handleLoginInputChange} placeholder="Digite sua senha" required style={inputStyleWithShadow} />
                        </div>
                        <div className="form-options-clean">
                            <label className="medlab-custom-checkbox-container">
                                <input type="checkbox" />
                                <span className="medlab-checkbox-checkmark"></span>
                                <span className="medlab-checkbox-label-text" style={{ fontSize: '14px', fontWeight: '500' }}>Lembrar minha senha</span>
                            </label>
                            <a href="#esqueceu-senha" className="forgot-password-clean-link">Esqueceu a senha?</a>
                        </div>
                        <button type="submit" className="btn-login-submit-final">Entrar</button>
                    </form>
                </div>
            </div>
        )
    }

    if (currentScreen === 'login-medico') {
        return (
            <div className="login-screen-clean-container">
                <button onClick={() => setCurrentScreen('landing')} className="btn-voltar-topo-esquerdo">
                    <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                </button>
                <div className="login-clean-wrapper">
                    <div className="login-logo-centered-box">
                        <img src="/logo-medlab.png" alt="MedLab Logo" className="login-logo-circle-img" />
                    </div>
                    <h2>Login do Médico</h2>
                    <form className="login-form-clean" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-field-group-clean">
                            <label>CRM / E-mail:</label>
                            <input type="text" placeholder="Digite seu CRM ou e-mail" required style={inputStyleWithShadow} />
                        </div>
                        <div className="input-field-group-clean">
                            <label>Senha:</label>
                            <input type="password" placeholder="Digite sua senha" required style={inputStyleWithShadow} />
                        </div>
                        <div className="form-options-clean">
                            <label className="medlab-custom-checkbox-container">
                                <input type="checkbox" />
                                <span className="medlab-checkbox-checkmark"></span>
                                <span className="medlab-checkbox-label-text" style={{ fontSize: '14px', fontWeight: '500' }}>Lembrar minha senha</span>
                            </label>
                            <a href="#esqueceu-senha" className="forgot-password-clean-link">Esqueceu a senha?</a>
                        </div>
                        <button type="submit" className="btn-login-submit-final">Entrar</button>
                    </form>
                </div>
            </div>
        )
    }

    if (currentScreen === 'atendimentos') {
        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <main className="medlab-new-content-area">
                        <h2>Atendimentos</h2>

                        <div className="action-cards-grid">
                            <div className="main-action-card" onClick={() => setCurrentScreen('meus-atendimentos')}>
                                <ClipboardList size={32} color="#0c9488" className="icon-list" />
                                <div className="card-text">
                                    <h3>Meus atendimentos</h3>
                                    <p>Acesse seus atendimentos pendentes and seu histórico</p>
                                </div>
                            </div>

                            <div className="side-by-side-row">
                                <div className="secondary-action-card" onClick={() => setCurrentScreen('selecionar-servicos')}>
                                    <Plus size={32} color="#0c9488" />
                                    <h3>Marcar consulta</h3>
                                </div>
                                <div className="secondary-action-card" onClick={() => setCurrentScreen('selecionar-exames')}>
                                    <Plus size={32} color="#0c9488" />
                                    <h3>Marcar exame</h3>
                                </div>
                            </div>

                            <div
                                className="cancel-action-card"
                                onClick={() => setCurrentScreen('cancelar-agendamento')}
                                style={{ cursor: 'pointer' }}
                            >
                                <X size={32} color="#FF0000" />
                                <h3>Cancelar Agendamento</h3>
                            </div>
                        </div>
                    </main>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner" style={{ gap: '28px', justifyContent: 'space-evenly' }}>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'painel-paciente' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('painel-paciente')}
                            >
                                <Home size={22} />
                                <span>Home</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'atendimentos' || currentScreen === 'meus-atendimentos' || currentScreen === 'cancelar-agendamento' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('atendimentos')}
                            >
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'carrinho' ? 'active' : ''}`}
                                onClick={() => {
                                    if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                        alert('O carrinho não está disponível para atendimentos via convênio.');
                                    } else {
                                        setCurrentScreen('carrinho');
                                    }
                                }}
                                style={{
                                    opacity: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 0.5 : 1,
                                    cursor: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'perfil' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('perfil')}
                            >
                                <User size={22} />
                                <span>Perfil</span>
                            </button>

                        </div>
                    </nav>

                </div>
            </div>
        )
    }

    if (currentScreen === 'meus-atendimentos') {
        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('atendimentos')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area center-title-layout">
                        <div className="title-section-centered">
                            <h2>Meus Atendimentos</h2>
                            <p className="subtitle-section">Histórico de Agendamentos</p>
                        </div>

                        <div className="atendimentos-lista-wrapper">

                            {/* RENDERIZA OS NOVOS AGENDAMENTOS DINAMICAMENTE */}
                            {agendamentos.filter(a => a.id !== 1 && a.id !== 2).map((agendamento) => (
                                <div key={agendamento.id} className="card-atendimento-item-v2">
                                    <div className="item-v2-left">
                                        <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                            {agendamento.tipo === 'Consulta' ? (
                                                <Stethoscope size={22} style={{ color: '#0c9488' }} />
                                            ) : (
                                                <Activity size={22} style={{ color: '#5d1014' }} />
                                            )}
                                        </div>
                                        <div className="text-wrapper-v2">
                                            <h4>{agendamento.tipo}</h4>
                                            {/* FORMATAÇÃO: Especialidade - Data e Horário - Nome do Médico */}
                                            <p>{agendamento.especialidade} - {agendamento.data} às {agendamento.hora} - {agendamento.medico}</p>
                                        </div>
                                    </div>
                                    <span className="status-badge-v2 badge-pendente">Pendente</span>
                                </div>
                            ))}

                            {/* Só renderiza o card da Consulta se o ID 1 ainda existir no banco */}
                            {agendamentos.some(a => a.id === 1) && (
                                <div className="card-atendimento-item-v2">
                                    <div className="item-v2-left">
                                        <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                            <Stethoscope size={22} style={{ color: '#0c9488' }} />
                                        </div>
                                        <div className="text-wrapper-v2">
                                            <h4>Consulta</h4>
                                            <p>Cardiologista</p>
                                        </div>
                                    </div>
                                    <span className="status-badge-v2 badge-pendente">Pendente</span>
                                </div>
                            )}

                            {/* Só renderiza o card do Exame se o ID 2 ainda existir no banco */}
                            {agendamentos.some(a => a.id === 2) && (
                                <div className="card-atendimento-item-v2">
                                    <div className="item-v2-left">
                                        <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                            <Activity size={22} style={{ color: '#5d1014' }} />
                                        </div>
                                        <div className="text-wrapper-v2">
                                            <h4>Exame</h4>
                                            <p>Dermatoscopia</p>
                                        </div>
                                    </div>
                                    <span className="status-badge-v2 badge-pendente">Pendente</span>
                                </div>
                            )}

                            <div className="card-atendimento-item-v2">
                                <div className="item-v2-left">
                                    <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                        <Stethoscope size={22} style={{ color: '#0c9488' }} />
                                    </div>
                                    <div className="text-wrapper-v2">
                                        <h4>Consulta</h4>
                                        <p>Endocrinologista</p>
                                    </div>
                                </div>
                                <span className="status-badge-v2 badge-cancelada">Cancelada</span>
                            </div>

                            <div className="card-atendimento-item-v2">
                                <div className="item-v2-left">
                                    <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                        <Activity size={22} style={{ color: '#5d1014' }} />
                                    </div>
                                    <div className="text-wrapper-v2">
                                        <h4>Exame</h4>
                                        <p>Eletrocardiograma</p>
                                    </div>
                                </div>
                                <span className="status-badge-v2 badge-concluido">Concluído</span>
                            </div>

                            <div className="card-atendimento-item-v2">
                                <div className="item-v2-left">
                                    <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                        <Stethoscope size={22} style={{ color: '#0c9488' }} />
                                    </div>
                                    <div className="text-wrapper-v2">
                                        <h4>Consulta</h4>
                                        <p>Dermatologista</p>
                                    </div>
                                </div>
                                <span className="status-badge-v2 badge-concluido">Concluído</span>
                            </div>

                        </div>
                    </main>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner" style={{ gap: '28px', justifyContent: 'space-evenly' }}>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'painel-paciente' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('painel-paciente')}
                            >
                                <Home size={22} />
                                <span>Home</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'atendimentos' || currentScreen === 'meus-atendimentos' || currentScreen === 'cancelar-agendamento' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('atendimentos')}
                            >
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'carrinho' ? 'active' : ''}`}
                                onClick={() => {
                                    if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                        alert('O carrinho não está disponível para atendimentos via convênio.');
                                    } else {
                                        setCurrentScreen('carrinho');
                                    }
                                }}
                                style={{
                                    opacity: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 0.5 : 1,
                                    cursor: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'perfil' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('perfil')}
                            >
                                <User size={22} />
                                <span>Perfil</span>
                            </button>

                        </div>
                    </nav>

                </div>
            </div>
        )
    }

    if (currentScreen === 'carrinho') {
        const itensNoCarrinho = Array.isArray(agendamentos)
            ? agendamentos.filter(a => a && a.status === 'Pendente')
            : [];

        const valorTotal = itensNoCarrinho.reduce((soma, item) => {
            if (item.tipo === 'Consulta') return soma + 150.00;
            if (item.tipo === 'Exame') return soma + 300.00;
            return soma + 150.00;
        }, 0);

        const valorTotalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('painel-paciente')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area center-title-layout">
                        <div className="title-section-centered">
                            <h2>Carrinho</h2>
                            <p className="subtitle-section">Resumo dos seus itens para pagamento</p>
                        </div>

                        <div className="atendimentos-lista-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px' }}>

                            {itensNoCarrinho.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '16px' }}>
                                    <div style={{ fontSize: '48px', color: '#1e293b' }}>😐</div>
                                    <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>
                                        Parece que seu carrinho está vazio
                                    </p>
                                    <button
                                        className="btn-medlab-hora-slot"
                                        style={{ width: 'auto', padding: '12px 24px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                                        onClick={() => setCurrentScreen('selecionar-servicos')}
                                    >
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span> Adicionar atendimento ao carrinho
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {itensNoCarrinho.map((item) => (
                                        <div key={item.id} className="card-atendimento-item-v2" style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <div className="item-v2-left">
                                                <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                                    {item.tipo === 'Consulta' ? (
                                                        <Stethoscope size={22} style={{ color: '#0c9488' }} />
                                                    ) : (
                                                        <Activity size={22} style={{ color: '#5d1014' }} />
                                                    )}
                                                </div>
                                                <div className="text-wrapper-v2">
                                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{item.tipo}</h4>
                                                    <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                                        {item.especialidade} - {item.medico} - {item.hora} do dia {item.data}
                                                    </p>
                                                    <strong style={{ display: 'block', marginTop: '6px', color: '#0c9488', fontSize: '14px' }}>
                                                        {item.tipo === 'Consulta' ? "R$ 150,00" : "R$ 300,00"}
                                                    </strong>
                                                </div>
                                            </div>
                                            <span className="status-badge-v2 badge-pendente">Pendente</span>
                                        </div>
                                    ))}

                                    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                                        <div>
                                            <span style={{ fontSize: '14px', color: '#64748b', display: 'block' }}>Total a pagar:</span>
                                            <strong style={{ fontSize: '24px', color: '#0f172a' }}>{valorTotalFormatado}</strong>
                                        </div>
                                        <button
                                            className="btn-modal-confirm"
                                            style={{ width: 'auto', minWidth: '180px', maxWidth: '240px', padding: '12px 24px', margin: 0, alignSelf: 'center' }}
                                            onClick={() => setCurrentScreen('carrinho-finalizado')}
                                        >
                                            Fechar Pedido
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>
                    </main>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner" style={{ gap: '28px', justifyContent: 'space-evenly' }}>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('painel-paciente')}>
                                <Home size={22} />
                                <span>Home</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('atendimentos')}>
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>
                            <button className="medlab-desktop-nav-btn active" onClick={() => setCurrentScreen('carrinho')}>
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('perfil')}>
                                <User size={22} />
                                <span>Perfil</span>
                            </button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }

    if (currentScreen === 'carrinho-finalizado') {
        const itensNoCarrinho = Array.isArray(agendamentos)
            ? agendamentos.filter(a => a && a.status === 'Pendente')
            : [];

        const valorTotal = itensNoCarrinho.reduce((soma, item) => {
            if (item.tipo === 'Consulta') return soma + 150.00;
            if (item.tipo === 'Exame') return soma + 300.00;
            return soma + 150.00;
        }, 0);

        const valorTotalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('painel-paciente')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area center-title-layout">
                        <div className="title-section-centered">
                            <h2>Carrinho</h2>
                            <p className="subtitle-section" style={{ color: '#0c9488', fontWeight: 'bold' }}>✓ Pedido Fechado com Sucesso</p>
                        </div>

                        <div className="atendimentos-lista-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px' }}>

                            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <div style={{ backgroundColor: '#dcfce7', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ClipboardList size={20} style={{ color: '#16a34a' }} />
                                </div>
                                <p style={{ margin: 0, fontSize: '14px', color: '#166534', fontWeight: '500', lineHeight: '1.4' }}>
                                    <strong>Aviso:</strong> O pagamento deste pedido deverá ser realizado <strong>somente presencialmente na clínica</strong> no dia do atendimento.
                                </p>
                            </div>

                            {itensNoCarrinho.map((item) => (
                                <div key={item.id} className="card-atendimento-item-v2" style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', opacity: 0.85 }}>
                                    <div className="item-v2-left">
                                        <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                            {item.tipo === 'Consulta' ? (
                                                <Stethoscope size={22} style={{ color: '#0c9488' }} />
                                            ) : (
                                                <Activity size={22} style={{ color: '#5d1014' }} />
                                            )}
                                        </div>
                                        <div className="text-wrapper-v2">
                                            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{item.tipo}</h4>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                                {item.especialidade} - {item.medico} - {item.hora} do dia {item.data}
                                            </p>
                                            <strong style={{ display: 'block', marginTop: '6px', color: '#64748b', fontSize: '14px' }}>
                                                {item.tipo === 'Consulta' ? "R$ 150,00" : "R$ 300,00"}
                                            </strong>
                                        </div>
                                    </div>
                                    <span className="status-badge-v2" style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                    Pendente na Clínica
                                </span>
                                </div>
                            ))}

                            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '14px', color: '#64748b', display: 'block' }}>Total do pedido:</span>
                                    <strong style={{ fontSize: '24px', color: '#0f172a' }}>{valorTotalFormatado}</strong>
                                </div>
                                <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500', backgroundColor: '#e2e8f0', padding: '8px 16px', borderRadius: '8px' }}>
                                Aguardando no balcão
                            </span>
                            </div>

                        </div>
                    </main>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner" style={{ gap: '28px', justifyContent: 'space-evenly' }}>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('painel-paciente')}>
                                <Home size={22} />
                                <span>Home</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('atendimentos')}>
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>
                            <button className="medlab-desktop-nav-btn active" onClick={() => setCurrentScreen('carrinho')}>
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('perfil')}>
                                <User size={22} />
                                <span>Perfil</span>
                            </button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }

    if (currentScreen === 'perfil') {
        const capitalizarNomeCompleto = (nome) => {
            if (!nome) return 'Usuário';
            return nome
                .toLowerCase()
                .split(' ')
                .map(palavra => {
                    if (['de', 'da', 'do', 'dos', 'das', 'e'].includes(palavra)) {
                        return palavra;
                    }
                    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
                })
                .join(' ');
        };

        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <main className="medlab-new-content-area perfil-main-area">

                        <div className="perfil-header-container">
                            <h2 className="perfil-title">Perfil</h2>

                            <div className="perfil-user-info">
                                <div className="perfil-avatar-circle">
                                    <User size={32} className="perfil-avatar-icon" />
                                </div>
                                <div>
                                    <h4 className="perfil-username">
                                        {capitalizarNomeCompleto(usuarioLogado?.nomeCompleto)}
                                    </h4>
                                    <p className="perfil-user-role">Usuário padrão</p>
                                </div>
                            </div>
                        </div>

                        <div className="perfil-menu-list">

                            <button
                                className="card-atendimento-item-v2 perfil-menu-item"
                                onClick={() => setCurrentScreen('dados-conta')}
                            >
                                <div className="perfil-menu-item-content">
                                    <span className="perfil-menu-emoji">👤</span>
                                    <span className="perfil-menu-text">Dados da conta</span>
                                </div>
                                <span className="perfil-menu-arrow">&gt;</span>
                            </button>

                            <button
                                className="card-atendimento-item-v2 perfil-menu-item"
                                onClick={() => setCurrentScreen('suporte')} /* <--- ADICIONE ISSO */
                            >
                                <div className="perfil-menu-item-content">
                                    <span className="perfil-menu-emoji">💬</span>
                                    <span className="perfil-menu-text">Suporte</span>
                                </div>
                                <span className="perfil-menu-arrow">&gt;</span>
                            </button>

                            <button className="card-atendimento-item-v2 perfil-menu-item">
                                <div className="perfil-menu-item-content">
                                    <span className="perfil-menu-emoji">👥</span>
                                    <span className="perfil-menu-text">Dependentes</span>
                                </div>
                                <span className="perfil-menu-arrow">&gt;</span>
                            </button>

                            <button
                                className="card-atendimento-item-v2 perfil-menu-item"
                                onClick={() => setCurrentScreen('endereco')}
                            >
                                <div className="perfil-menu-item-content">
                                    <span className="perfil-menu-emoji">📍</span>
                                    <span className="perfil-menu-text">Endereços</span>
                                </div>
                                <span className="perfil-menu-arrow">&gt;</span>
                            </button>

                            <button
                                className="card-atendimento-item-v2 perfil-menu-item"
                                onClick={() => setCurrentScreen('convenio-perfil')}
                            >
                                <div className="perfil-menu-item-content">
                                    <span className="perfil-menu-emoji">🤝</span>
                                    <span className="perfil-menu-text">Convênio</span>
                                </div>
                                <span className="perfil-menu-arrow">&gt;</span>
                            </button>

                            <button
                                className="card-atendimento-item-v2 perfil-menu-item btn-sair-conta"
                                onClick={handleLogout}
                            >
                                <div className="perfil-menu-item-content">
                                    <span className="perfil-menu-emoji">🚪</span>
                                    <span className="perfil-menu-text" style={{ color: '#ef4444', fontWeight: '600' }}>Sair da conta</span>
                                </div>
                                <span className="perfil-menu-arrow" style={{ color: '#ef4444' }}>&gt;</span>
                            </button>

                            <button
                                className="card-atendimento-item-v2 perfil-menu-item btn-deletar-conta-menu"
                                onClick={() => setCurrentScreen('deletar-conta-aviso')}
                            >
                                <div className="perfil-menu-item-content">
                                    <span className="perfil-menu-emoji">⚠️</span>
                                    <span className="perfil-menu-text">Excluir minha conta</span>
                                </div>
                                <span className="perfil-menu-arrow">&gt;</span>
                            </button>

                        </div>
                    </main>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner nav-inner-spacing">
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('painel-paciente')}>
                                <Home size={22} />
                                <span>Home</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('atendimentos')}>
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => {
                                if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                    alert('O carrinho não está disponível para atendimentos via convênio.');
                                } else {
                                    setCurrentScreen('carrinho');
                                }
                            }}>
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>
                            <button className="medlab-desktop-nav-btn active" onClick={() => setCurrentScreen('perfil')}>
                                <User size={22} />
                                <span>Perfil</span>
                            </button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }

    if (currentScreen === 'dados-conta') {
        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('perfil')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area dados-main-area">

                        <div className="dados-title-section-centered">
                            <h2 className="dados-title">Dados da Conta</h2>
                            <p className="dados-subtitle-section">Consulte ou atualize as informações do seu perfil</p>
                        </div>

                        <div className="dados-card-box">
                            <div className="dados-form-grid">

                                {/* Campo de Nome Completo alterado para editável (removido o 'disabled') */}
                                <div className="dados-input-group">
                                    <label className="dados-label">Nome Completo *</label>
                                    <input
                                        type="text"
                                        defaultValue={usuarioLogado?.nomeCompleto || ''}
                                        className="dados-input-field"
                                    />
                                </div>

                                <div className="dados-input-group">
                                    <label className="dados-label">CPF</label>
                                    <input
                                        type="text"
                                        defaultValue={usuarioLogado?.cpf || '000.000.000-00'}
                                        className="dados-input-field cpf-disabled"
                                        disabled
                                    />
                                </div>

                                <div className="dados-input-group">
                                    <label className="dados-label">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        defaultValue={usuarioLogado?.dataNascimento || '1995-01-01'}
                                        className="dados-input-field"
                                    />
                                </div>

                                <div className="dados-input-group">
                                    <label className="dados-label">Telefone / WhatsApp</label>
                                    <input
                                        type="text"
                                        defaultValue={usuarioLogado?.telefone || '(11) 99999-9999'}
                                        className="dados-input-field"
                                    />
                                </div>

                                <div className="dados-input-group">
                                    <label className="dados-label">E-mail</label>
                                    <input
                                        type="email"
                                        defaultValue={usuarioLogado?.email || ''}
                                        className="dados-input-field"
                                    />
                                </div>

                                <div className="dados-input-group">
                                    <label className="dados-label">Senha de Acesso</label>
                                    <input
                                        type="password"
                                        defaultValue={usuarioLogado?.senha || '********'}
                                        className="dados-input-field"
                                    />
                                </div>

                                <button
                                    className="btn-modal-confirm dados-submit-btn"
                                    onClick={() => {
                                        alert('Dados salvos com sucesso!');
                                        setCurrentScreen('perfil');
                                    }}
                                >
                                    Salvar Alterações
                                </button>

                            </div>
                        </div>
                    </main>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner nav-inner-spacing">
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('painel-paciente')}>
                                <Home size={22} />
                                <span>Home</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('atendimentos')}>
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => {
                                if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                    alert('O carrinho não está disponível para atendimentos via convênio.');
                                } else {
                                    setCurrentScreen('carrinho');
                                }
                            }}>
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>
                            <button className="medlab-desktop-nav-btn active" onClick={() => setCurrentScreen('perfil')}>
                                <User size={22} />
                                <span>Perfil</span>
                            </button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }

    if (currentScreen === 'suporte') {
        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('perfil')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area dados-main-area">

                        {/* Título Centralizado - Estilos movidos para a classe dados-title-section-centered */}
                        <div className="dados-title-section-centered">
                            <h2 className="dados-title">
                                Suporte
                            </h2>
                            <p className="dados-subtitle-section">
                                Precisa de ajuda? Fale conosco por um de nossos canais
                            </p>
                        </div>

                        {/* Card de Informações */}
                        <div className="suporte-container-box">
                            <div className="suporte-info-list">

                                <div className="suporte-item">
                                    <span className="suporte-label">🟢 WhatsApp</span>
                                    <p className="suporte-value">(11) 99999-0000</p>
                                </div>

                                <div className="suporte-item">
                                    <span className="suporte-label">📞 Telefone</span>
                                    <p className="suporte-value">0800 123 4567</p>
                                </div>

                                <div className="suporte-item">
                                    <span className="suporte-label">✉️ E-mail</span>
                                    <p className="suporte-value">suporte@medlabficticio.com.br</p>
                                </div>

                                <div className="suporte-item">
                                    <span className="suporte-label">🕒 Horário de Funcionamento</span>
                                    <div className="suporte-horarios">
                                        <p className="suporte-horario-linha"><strong>Seg à Sex:</strong> 7h às 17h</p>
                                        <p className="suporte-horario-linha"><strong>Sábado:</strong> 7h às 12h</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </main>

                    {/* Menu inferior padrão */}
                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner nav-inner-spacing">
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('painel-paciente')}>
                                <Home size={22} />
                                <span>Home</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('atendimentos')}>
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => {
                                if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                    alert('O carrinho não está disponível para atendimentos via convênio.');
                                } else {
                                    setCurrentScreen('carrinho');
                                }
                            }}>
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>
                            <button className="medlab-desktop-nav-btn active" onClick={() => setCurrentScreen('perfil')}>
                                <User size={22} />
                                <span>Perfil</span>
                            </button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }

    if (currentScreen === 'endereco') {
        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('perfil')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area dados-main-area">

                        {/* Título Centralizado */}
                        <div className="dados-title-section-centered">
                            <h2 className="dados-title">Meu Endereço</h2>
                            <p className="dados-subtitle-section">
                                Mantenha seu endereço residencial atualizado para exames domiciliares
                            </p>
                        </div>

                        {/* Formulário de Endereço Editável */}
                        <div className="endereco-container-box">
                            <form className="endereco-form-clean" onSubmit={handleSalvarEnderecoSubmit}>

                                <div className="endereco-form-row row-30-70">
                                    <div className="input-field-group-clean">
                                        <label>CEP:</label>
                                        <input type="text" name="cep" value={enderecoData.cep} onChange={handleEnderecoInputChange} placeholder="00000-000" required />
                                    </div>
                                    <div className="input-field-group-clean">
                                        <label>Logradouro (Rua/Avenida):</label>
                                        <input type="text" name="logradouro" value={enderecoData.logradouro} onChange={handleEnderecoInputChange} placeholder="Rua, Av..." required />
                                    </div>
                                </div>

                                <div className="endereco-form-row row-30-70">
                                    <div className="input-field-group-clean">
                                        <label>Número:</label>
                                        <input type="text" name="numero" value={enderecoData.numero} onChange={handleEnderecoInputChange} placeholder="Nº" required />
                                    </div>
                                    <div className="input-field-group-clean">
                                        <label>Complemento:</label>
                                        <input type="text" name="complemento" value={enderecoData.complemento} onChange={handleEnderecoInputChange} placeholder="Apto, Bloco, Casa..." />
                                    </div>
                                </div>

                                <div className="input-field-group-clean">
                                    <label>Bairro:</label>
                                    <input type="text" name="bairro" value={enderecoData.bairro} onChange={handleEnderecoInputChange} placeholder="Digite seu bairro" required />
                                </div>

                                <div className="endereco-form-row row-70-30">
                                    <div className="input-field-group-clean">
                                        <label>Cidade:</label>
                                        <input type="text" name="cidade" value={enderecoData.cidade} onChange={handleEnderecoInputChange} placeholder="Sua cidade" required />
                                    </div>
                                    <div className="input-field-group-clean">
                                        <label>UF:</label>
                                        <input type="text" name="estado" maxLength="2" value={enderecoData.estado} onChange={handleEnderecoInputChange} placeholder="SP" required />
                                    </div>
                                </div>

                                <button type="submit" className="btn-login-submit-final btn-salvar-endereco">
                                    Salvar Alterações
                                </button>
                            </form>
                        </div>
                    </main>

                    {/* Menu inferior padrão */}
                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner nav-inner-spacing">
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('painel-paciente')}>
                                <Home size={22} />
                                <span>Home</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('atendimentos')}>
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => {
                                if (typeof convenioAtivated !== 'undefined' && convenioAtivated === true) {
                                    alert('O carrinho não está disponível para atendimentos via convênio.');
                                } else {
                                    setCurrentScreen('carrinho');
                                }
                            }}>
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>
                            <button className="medlab-desktop-nav-btn active" onClick={() => setCurrentScreen('perfil')}>
                                <User size={22} />
                                <span>Perfil</span>
                            </button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }

    if (currentScreen === 'convenio-perfil') {
        const convenioExibicao = formData.tipoConvenio && formData.tipoConvenio !== ""
            ? formData.tipoConvenio
            : "Particular (Sem convênio)";

        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('perfil')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area dados-main-area">

                        {/* Título Centralizado */}
                        <div className="dados-title-section-centered">
                            <h2 className="dados-title">Meu Convênio</h2>
                            <p className="dados-subtitle-section">
                                Informações sobre o plano de saúde vinculado à sua conta MedLab
                            </p>
                        </div>

                        {/* Card de Visualização do Convênio */}
                        <div className="convenio-container-box">
                            <div className="convenio-form-clean">

                                <div className="input-field-group-clean">
                                    <label>Plano / Convênio Atual:</label>
                                    <input
                                        type="text"
                                        value={convenioExibicao}
                                        readOnly
                                        className="input-disabled-convenio"
                                    />
                                </div>

                                <p className="convenio-aviso-text">
                                    * Para segurança dos seus dados de faturamento, alterações de convênio devem ser solicitadas diretamente na recepção de uma de nossas unidades.
                                </p>

                                <button
                                    type="button"
                                    className="btn-voltar-perfil-convenio"
                                    onClick={() => setCurrentScreen('perfil')}
                                >
                                    Voltar ao Perfil
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Menu inferior padrão */}
                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner nav-inner-spacing">
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('painel-paciente')}>
                                <Home size={22} />
                                <span>Home</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => setCurrentScreen('atendimentos')}>
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>
                            <button className="medlab-desktop-nav-btn" onClick={() => {
                                if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                    alert('O carrinho não está disponível para atendimentos via convênio.');
                                } else {
                                    setCurrentScreen('carrinho');
                                }
                            }}>
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>
                            <button className="medlab-desktop-nav-btn active" onClick={() => setCurrentScreen('perfil')}>
                                <User size={22} />
                                <span>Perfil</span>
                            </button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }

    if (currentScreen === 'deletar-conta-aviso') {
        const handleConfirmarExclusaoDireta = () => {
            setUsuarioLogado(null);
            setCadastroStep(1);
            setCurrentScreen('landing');
        };

        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('perfil')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area dados-main-area">

                        {/* Título de Alerta */}
                        <div className="dados-title-section-centered">
                            <h2 className="dados-title" style={{ color: '#dc2626' }}>Aviso Importante</h2>
                            <p className="dados-subtitle-section">
                                Leia com atenção antes de prosseguir com a exclusão
                            </p>
                        </div>

                        {/* Caixa de Riscos */}
                        <div className="deletar-container-box">
                            <div className="deletar-riscos-list">
                                <p className="deletar-risco-item">
                                    ❌ <strong>Perda de Histórico:</strong> Você perderá o acesso a todos os seus laudos, resultados de exames e receitas antigas.
                                </p>
                                <p className="deletar-risco-item">
                                    ❌ <strong>Agendamentos Cancelados:</strong> Qualquer consulta ou exame marcado para os próximos dias será cancelado automaticamente.
                                </p>
                                <p className="deletar-risco-item">
                                    ❌ <strong>Ação Irreversível:</strong> Não será possível recuperar seus dados ou reativar esta conta no futuro.
                                </p>
                            </div>

                            <div className="deletar-pergunda-box">
                                <p>Tem certeza absoluta de que deseja deletar sua conta?</p>
                            </div>

                            {/* Ações de Confirmação */}
                            <div className="deletar-botoes-actions">
                                <button
                                    type="button"
                                    className="btn-deletar-cancelar"
                                    onClick={() => setCurrentScreen('perfil')}
                                >
                                    Não, quero ficar
                                </button>
                                <button
                                    type="button"
                                    className="btn-deletar-confirmar-final"
                                    onClick={handleConfirmarExclusaoDireta}
                                >
                                    Sim, deletar permanentemente
                                </button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        );
    }

    if (currentScreen === 'selecionar-servicos') {
        return (
            <div className="medlab-services-screen-wrapper" onClick={() => setIsConsultaFocused(false)}>
                <div className="medlab-services-mobile-container" onClick={(e) => e.stopPropagation()}>

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => { setEspecialistaSelecionado(null); setIsConsultaFocused(false); setCurrentScreen('atendimentos'); }}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <h2 className="services-page-title" style={{ margin: '0 0 15px 0', textAlign: 'left', fontSize: '24px', fontWeight: '700', color: '#000' }}>
                        Selecionar serviços
                    </h2>

                    <div className="medlab-services-meta-info">
                        <div className="meta-left">
                            <span className="meta-label">Você está na categoria:</span>
                            <span className="meta-value">Consulta</span>
                        </div>
                        <button className="btn-link-main-screen" onClick={() => {
                            setSearchFilter('');
                            setIsConsultaFocused(false);
                            setEspecialistaSelecionado(null);
                            setCurrentScreen('selecionar-exames');
                        }}>
                            Trocar para categoria: Exame
                        </button>
                    </div>

                    <div className="medlab-services-search-container">
                        <Search size={22} className="search-box-lupa-icon" />
                        <input
                            type="text"
                            placeholder="Pesquisar consulta"
                            className="services-search-input-field"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            onFocus={(e) => { e.stopPropagation(); setIsConsultaFocused(true); }}
                        />
                    </div>

                    {(isConsultaFocused || searchFilter.length > 0) && (
                        <div className="medlab-specialists-scroll-list">
                            {filteredEspecialistas.map((especialista, index) => (
                                <div
                                    key={index}
                                    className={`specialist-row-item ${especialistaSelecionado === especialista ? 'selected' : ''}`}
                                    onClick={() => setEspecialistaSelecionado(especialista)}
                                >
                                    <span>{especialista}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="medlab-services-footer-action">
                        <button
                            className="btn-services-submit-next"
                            disabled={!especialistaSelecionado}
                            onClick={() => setCurrentScreen('selecionar-horario')}
                        >
                            Próximo
                        </button>
                    </div>

                </div>
            </div>
        )
    }

    if (currentScreen === 'selecionar-exames') {
        return (
            /* Ao clicar no fundo da tela, fecha a aba de pesquisa */
            <div className="medlab-services-screen-wrapper" onClick={() => setIsExameFocused(false)}>
                <div className="medlab-services-mobile-container" onClick={(e) => e.stopPropagation()}>

                    <header className="medlab-custom-back-header">
                        {/* CORREÇÃO: Reseta o exame selecionado E desativa o foco da pesquisa ao voltar */}
                        <button className="btn-voltar-painel-atendimentos" onClick={() => { setEspecialistaSelecionado(null); setIsExameFocused(false); setCurrentScreen('atendimentos'); }}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    {/* Título posicionado perfeitamente em cima da categoria: Exame */}
                    <h2 className="services-page-title" style={{ margin: '0 0 15px 0', textAlign: 'left', fontSize: '24px', fontWeight: '700', color: '#000' }}>
                        Selecionar serviços
                    </h2>

                    <div className="medlab-services-meta-info">
                        <div className="meta-left">
                            <span className="meta-label">Você está na categoria:</span>
                            <span className="meta-value">Exame</span>
                        </div>
                        <button className="btn-link-main-screen" onClick={() => {
                            setSearchFilter('');
                            setIsExameFocused(false);
                            setEspecialistaSelecionado(null);
                            setCurrentScreen('selecionar-servicos');
                        }}>
                            Trocar para categoria: Consulta
                        </button>
                    </div>

                    <div className="medlab-services-search-container">
                        <Search size={22} className="search-box-lupa-icon" />
                        <input
                            type="text"
                            placeholder="Pesquisar exame"
                            className="services-search-input-field"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            onFocus={(e) => { e.stopPropagation(); setIsExameFocused(true); }}
                        />
                    </div>

                    {(isExameFocused || searchFilter.length > 0) && (
                        <div className="medlab-specialists-scroll-list">
                            {[
                                'Hemograma completo',
                                'Exame de urina',
                                'Eletrocardiograma (ECG)',
                                'Ecocardiograma',
                                'Raio-X',
                                'Ressonância magnética',
                                'Dermatoscopia',
                                'Biópsia de pele',
                                'Preventivo com papanicolau',
                                'Ultrassonografia pélvica',
                                'Exame de acuidade visual',
                                'Tonometria',
                                'Eletroencefalograma (EEG)',
                                'Tomografia computadorizada',
                                'Glicemia',
                                'TSH (exame hormonal)',
                                'Avaliação clínica',
                                'Testes psicológicos'
                            ]
                                .filter(exame => exame.toLowerCase().includes(searchFilter.toLowerCase()))
                                .map((exame, index) => (
                                    <div
                                        key={index}
                                        className={`specialist-row-item ${especialistaSelecionado === exame ? 'selected' : ''}`}
                                        onClick={() => setEspecialistaSelecionado(exame)}
                                    >
                                        <span>{exame}</span>
                                    </div>
                                ))}
                        </div>
                    )}

                    <div className="medlab-services-footer-action">
                        <button
                            className="btn-services-submit-next"
                            disabled={!especialistaSelecionado}
                            onClick={() => setCurrentScreen('selecionar-horario')}
                        >
                            Próximo
                        </button>
                    </div>

                </div>
            </div>
        )
    }

    if (currentScreen === 'selecionar-horario') {
        const diasSimulados = [
            { id: 1, diaSemana: 'Qua', num: '03', mes: 'Jun' },
            { id: 2, diaSemana: 'Qui', num: '04', mes: 'Jun' },
            { id: 3, diaSemana: 'Sex', num: '05', mes: 'Jun' },
            { id: 4, diaSemana: 'Sáb', num: '06', mes: 'Jun' },
            { id: 5, diaSemana: 'Seg', num: '08', mes: 'Jun' },
            { id: 6, diaSemana: 'Ter', num: '09', mes: 'Jun' },
            { id: 7, diaSemana: 'Qua', num: '10', mes: 'Jun' },
            { id: 8, diaSemana: 'Qui', num: '11', mes: 'Jun' },
            { id: 9, diaSemana: 'Sex', num: '12', mes: 'Jun' },
            { id: 10, diaSemana: 'Sáb', num: '13', mes: 'Jun' },
        ];

        const dataAtual = dataSelecionada || "Qua, 03 Jun";
        const nomeServico = especialistaSelecionado || "Clínico Geral";
        const ehConsulta = !['Hemograma completo', 'Exame de urina', 'Raio-X', 'Dermatoscopia'].includes(nomeServico);

        const precoExibicao = ehConsulta ? "R$ 150,00" : "R$ 300,00";
        const tipoServicoTexto = ehConsulta ? "uma Consulta" : "um Exame";

        const bancoMedicosPorServico = {
            "Ortopedia": ["Dr. João Pedro Santos", "Dra. Camila Soares", "Dr. Roberto Alencar", "Dr. Marcos Orto"],
            "Cardiologia": ["Dr. Matheus Oliveira", "Dra. Aline Chagas Dias", "Dr. Roberto Jefferson Souza", "Dra. Luciana Cardio"],
            "Pediatria": ["Dr. Carlos Eduardo Menezes", "Dra. Mariana Souza Ramos", "Dr. Juliano Beltrão Pedrosa", "Dra. Fernanda Pedia"],
            "Dermatologia": ["Dra. Helen Almeida Silva", "Dr. Luiz Eduardo Guimarães", "Dra. Clara Cavalcanti Mendonça", "Dr. Bruno Derma"],
            "Clínico Geral": ["Dr. Ricardo Augusto Fleury", "Dra. Beatriz Pinheiro Lima", "Dr. Fernando Henrique Paes", "Dra. Julia Clinica"],

            "Hemograma completo": ["Dr. Márcio Roberto Rezende", "Dra. Patrícia Alencar Vasconcelos", "Dr. Thiago Silveira Fontes"],
            "Exame de urina": ["Dra. Simone Santos Fagundes", "Dr. André Malta Neves", "Dra. Letícia Albuquerque Rocha"],
            "Raio-X": ["Dr. Alan Kardec Sanches", "Dra. Viviane Teles Moreira", "Dr. Samuel Justino Portela"],
            "Dermatoscopia": ["Dra. Tatiana Medeiros Peixoto", "Dr. Wagner Loureiro Antunes", "Dra. Camila Faustino Cordeiro"]
        };

        const medicosDoServico = bancoMedicosPorServico[nomeServico] || [
            "Dr. Anderson Silva Castro",
            "Dra. Juliana Prado Mendes",
            "Dr. Marcelo Oliveira Ramos"
        ];

        const obtenerEscalaDoDia = (diaChave) => {
            const prefixoDia = diaChave.split(',')[0].trim();

            switch (prefixoDia) {
                case "Seg":
                    return {
                        manha: [{ nome: medicosDoServico[0], horarios: [{ hora: '08:00h', disponível: true }, { hora: '09:00h', disponível: true }] }],
                        tarde: [{ nome: medicosDoServico[1], horarios: [{ hora: '14:00h', disponível: true }, { hora: '15:00h', disponível: true }] }]
                    };
                case "Ter":
                    return {
                        manha: [{ nome: medicosDoServico[2], horarios: [{ hora: '08:00h', disponível: true }, { hora: '10:00h', disponível: true }] }],
                        tarde: [{ nome: medicosDoServico[0], horarios: [{ hora: '15:00h', disponível: true }, { hora: '16:00h', disponível: true }] }]
                    };
                case "Qua":
                    return {
                        manha: [{ nome: medicosDoServico[1], horarios: [{ hora: '07:30h', disponível: true }, { hora: '09:00h', disponível: true }] }],
                        tarde: [{ nome: medicosDoServico[2], horarios: [{ hora: '13:00h', disponível: true }, { hora: '14:30h', disponível: true }] }]
                    };
                case "Qui":
                    return {
                        manha: [{ nome: medicosDoServico[0], horarios: [{ hora: '08:30h', disponível: true }, { hora: '11:00h', disponível: true }] }],
                        tarde: [{ nome: medicosDoServico[1], horarios: [{ hora: '14:00h', disponível: true }, { hora: '17:00h', disponível: true }] }]
                    };
                case "Sex":
                    return {
                        manha: [{ nome: medicosDoServico[2], horarios: [{ hora: '09:00h', disponível: true }, { hora: '11:30h', disponível: true }] }],
                        tarde: [{ nome: medicosDoServico[0], horarios: [{ hora: '15:00h', disponível: true }, { hora: '16:00h', disponível: true }] }]
                    };
                case "Sáb":
                    return {
                        manha: [{ nome: medicosDoServico[1], horarios: [{ hora: '08:00h', disponível: true }, { hora: '10:00h', disponível: true }] }],
                        tarde: []
                    };
                default:
                    return { manha: [], tarde: [] };
            }
        };

        const escalaBruta = obtenerEscalaDoDia(dataAtual);

        const dadosDoDiaAtual = {
            manha: escalaBruta.manha.map(medico => ({
                ...medico,
                horarios: medico.horarios.map(h => {
                    const isOcupado = (agendamentos || []).some(ag =>
                        ag.data === dataAtual &&
                        ag.hora === h.hora &&
                        ag.medico === medico.nome &&
                        ag.especialidade === nomeServico
                    );
                    return { ...h, disponível: isOcupado ? false : h.disponível };
                })
            })),
            tarde: escalaBruta.tarde.map(medico => ({
                ...medico,
                horarios: medico.horarios.map(h => {
                    const isOcupado = (agendamentos || []).some(ag =>
                        ag.data === dataAtual &&
                        ag.hora === h.hora &&
                        ag.medico === medico.nome &&
                        ag.especialidade === nomeServico
                    );
                    return { ...h, disponível: isOcupado ? false : h.disponível };
                })
            }))
        };

        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => {
                            setHoraSelecionada(null);
                            setCurrentScreen(ehConsulta ? 'selecionar-servicos' : 'selecionar-exames');
                        }}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-horarios-main">
                        <h2>Selecionar Horário</h2>
                        <p className="medlab-horarios-subtitle">
                            Agendamento para: <strong>{nomeServico}</strong> ({ehConsulta ? 'Consulta' : 'Exame'})
                        </p>

                        <div className="medlab-horarios-layout-container">

                            <div className="medlab-dates-sidebar">
                                {diasSimulados.map((d) => {
                                    const textoDia = `${d.diaSemana}, ${d.num} ${d.mes}`;
                                    const isSelected = dataAtual === textoDia;
                                    return (
                                        <div
                                            key={d.id}
                                            onClick={() => setDataSelecionada(textoDia)}
                                            className={`medlab-date-card ${isSelected ? 'selected' : ''}`}
                                        >
                                            <span className="day-name">{d.diaSemana}</span>
                                            <span className="day-num">{d.num}</span>
                                            <span className="month-name">{d.mes}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="medlab-content-schedule-area">
                                <div className="medlab-professional-card-box">

                                    <div className="medlab-card-top-clinic">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e6f7f4', padding: '8px', borderRadius: '8px' }}>
                                            <Stethoscope size={24} color="#0c9488" />
                                        </div>
                                        <div className="medlab-clinic-info-text">
                                            <h4>Clínica MEDLAB</h4>
                                            <p>{precoExibicao} sem Convênio</p>
                                        </div>
                                    </div>

                                    <div className="medlab-card-bottom-content">

                                        {dadosDoDiaAtual.manha.map((medico, idx) => (
                                            <div key={`man-${idx}`} className="medlab-period-white-card">
                                                <div className="medlab-doctor-row-info">
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #4a90e2', padding: '6px', borderRadius: '50%', backgroundColor: '#edf4fc' }}>
                                                        <User size={20} color="#4a90e2" />
                                                    </div>
                                                    <h4 className="medlab-doctor-name">{medico.nome}</h4>
                                                    <span className="medlab-period-tag">Manhã</span>
                                                </div>

                                                <div className="medlab-hours-grid-layout">
                                                    {medico.horarios.map((item, hIdx) => (
                                                        <button
                                                            key={hIdx}
                                                            className="btn-medlab-hora-slot"
                                                            disabled={!item.disponível}
                                                            onClick={() => {
                                                                setHoraSelecionada(`${item.hora} com ${medico.nome}`);
                                                                setMostrarModalConfirmacao(true);
                                                            }}
                                                        >
                                                            {item.hora}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {dadosDoDiaAtual.tarde.map((medico, idx) => (
                                            <div key={`tar-${idx}`} className="medlab-period-white-card">
                                                <div className="medlab-doctor-row-info">
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #e28743', padding: '6px', borderRadius: '50%', backgroundColor: '#fdf5f0' }}>
                                                        <User size={20} color="#e28743" />
                                                    </div>
                                                    <h4 className="medlab-doctor-name">{medico.nome}</h4>
                                                    <span className="medlab-period-tag">Tarde</span>
                                                </div>

                                                <div className="medlab-hours-grid-layout">
                                                    {medico.horarios.map((item, hIdx) => (
                                                        <button
                                                            key={hIdx}
                                                            className="btn-medlab-hora-slot"
                                                            disabled={!item.disponível}
                                                            onClick={() => {
                                                                setHoraSelecionada(`${item.hora} com ${medico.nome}`);
                                                                setMostrarModalConfirmacao(true);
                                                            }}
                                                        >
                                                            {item.hora}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>

                {/* Modal de Confirmação */}
                {mostrarModalConfirmacao && (
                    <div className="medlab-modal-backdrop">
                        <div className="medlab-modal-card">
                            <h3>Confirmar Agendamento</h3>
                            <p>
                                Deseja confirmar o agendamento de <strong>{tipoServicoTexto}</strong> de <strong>{nomeServico}</strong> para o dia <strong>{dataAtual}</strong> às <strong>{horaSelecionada}</strong>?
                            </p>

                            <div className="medlab-modal-actions">
                                <button className="btn-modal-cancel" onClick={() => { setMostrarModalConfirmacao(false); setHoraSelecionada(null); }}>
                                    Não
                                </button>
                                <button
                                    className="btn-modal-confirm"
                                    onClick={() => {
                                        const partesHorario = horaSelecionada.split(' com ');
                                        const apenasHora = partesHorario[0];
                                        const apenasMedico = partesHorario[1] || "Médico Plantonista";

                                        const novoAgendamento = {
                                            id: Date.now(),
                                            tipo: ehConsulta ? 'Consulta' : 'Exame',
                                            especialidade: nomeServico,
                                            medico: apenasMedico,
                                            data: dataAtual,
                                            hora: apenasHora,
                                            preco: precoExibicao,
                                            status: 'Pendente'
                                        };

                                        setAgendamentos(prev => [...prev, novoAgendamento]);

                                        setMostrarModalConfirmacao(false);
                                        setHoraSelecionada(null);
                                        if (typeof setEspecialistaSelecionado === 'function') setEspecialistaSelecionado(null);

                                        setCurrentScreen('meus-atendimentos');
                                    }}
                                >
                                    Sim
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (currentScreen === 'cancelar-agendamento') {
        const listaAgendamentos = Array.isArray(agendamentos) ? agendamentos : [];

        return (
            <div className="medlab-desktop-screen-wrapper">
                <div className="medlab-desktop-container">

                    <header className="medlab-custom-back-header">
                        <button className="btn-voltar-painel-atendimentos" onClick={() => setCurrentScreen('atendimentos')}>
                            <ArrowLeft size={20} /> Voltar
                        </button>
                    </header>

                    <main className="medlab-new-content-area center-title-layout">
                        <div className="title-section-centered">
                            <h2>Cancelar Agendamento</h2>
                            <p className="subtitle-section">Selecione um agendamento abaixo para cancelá-lo</p>
                        </div>

                        <div className="atendimentos-lista-wrapper">

                            {/* RENDERIZA OS AGENDAMENTOS */}
                            {listaAgendamentos.map((agendamento) => {
                                if (!agendamento) return null;

                                return (
                                    <div
                                        key={agendamento.id || Math.random()}
                                        className="card-atendimento-item-v2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (typeof setAgendamentoParaCancelar === 'function') {
                                                setAgendamentoParaCancelar(agendamento);
                                            }
                                            if (typeof setMostrarModalCancelar === 'function') {
                                                setMostrarModalCancelar(true);
                                            }
                                        }}
                                    >
                                        <div className="item-v2-left">
                                            <div className="icon-wrapper-v2 medlab-icon-circle-v2">
                                                {agendamento.tipo === 'Consulta' ? (
                                                    <Stethoscope size={22} style={{ color: '#0c9488' }} />
                                                ) : (
                                                    <Activity size={22} style={{ color: '#5d1014' }} />
                                                )}
                                            </div>
                                            <div className="text-wrapper-v2">
                                                <h4>{agendamento.tipo || 'Atendimento'}</h4>
                                                <p>{agendamento.especialidade} - {agendamento.data} às {agendamento.hora} - {agendamento.medico || "Médico Plantonista"}</p>
                                            </div>
                                        </div>
                                        <span className={`status-badge-v2 badge-${agendamento.status?.toLowerCase() || 'pendente'}`}>
                                        {agendamento.status || 'Pendente'}
                                    </span>
                                    </div>
                                );
                            })}

                            {listaAgendamentos.length === 0 && (
                                <p style={{ textAlign: 'center', color: '#64748b', marginTop: '20px' }}>
                                    Não há agendamentos ativos para cancelar.
                                </p>
                            )}

                        </div>
                    </main>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner" style={{ gap: '28px', justifyContent: 'space-evenly' }}>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'painel-paciente' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('painel-paciente')}
                            >
                                <Home size={22} />
                                <span>Home</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'atendimentos' || currentScreen === 'meus-atendimentos' || currentScreen === 'cancelar-agendamento' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('atendimentos')}
                            >
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'carrinho' ? 'active' : ''}`}
                                onClick={() => {
                                    if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                        alert('O carrinho não está disponível para atendimentos via convênio.');
                                    } else {
                                        setCurrentScreen('carrinho');
                                    }
                                }}
                                style={{
                                    opacity: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 0.5 : 1,
                                    cursor: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'perfil' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('perfil')}
                            >
                                <User size={22} />
                                <span>Perfil</span>
                            </button>

                        </div>
                    </nav>

                </div>

                {/* Modal de Confirmação Segura */}
                {typeof mostrarModalCancelar !== 'undefined' && mostrarModalCancelar && agendamentoParaCancelar && (
                    <div className="medlab-modal-backdrop">
                        <div className="medlab-modal-card">
                            <h3>Confirmar Cancelamento</h3>
                            <p>
                                Tem certeza que deseja cancelar {agendamentoParaCancelar.tipo === 'Consulta' ? 'a consulta' : 'o exame'} de <strong>{agendamentoParaCancelar.especialidade}</strong> marcada para <strong>{agendamentoParaCancelar.data}</strong> às <strong>{agendamentoParaCancelar.hora}</strong>?
                            </p>
                            <div className="medlab-modal-actions">
                                <button className="btn-modal-cancel" onClick={() => { setMostrarModalCancelar(false); setAgendamentoParaCancelar(null); }}>
                                    Não
                                </button>
                                <button
                                    className="btn-modal-confirm"
                                    style={{ backgroundColor: '#ef4444' }}
                                    onClick={() => {
                                        if (typeof setAgendamentos === 'function') {
                                            setAgendamentos(prev => Array.isArray(prev) ? prev.filter(a => a.id !== agendamentoParaCancelar.id) : []);
                                        }
                                        setMostrarModalCancelar(false);
                                        setAgendamentoParaCancelar(null);
                                        setCurrentScreen('atendimentos');
                                    }}
                                >
                                    Sim, Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (currentScreen === 'painel-paciente') {
        return (
            <div className="medlab-desktop-screen-wrapper" style={{ position: 'relative' }}>
                <div className="medlab-desktop-container">

                    <header className="medlab-desktop-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <img src="/logo-medlab.png" alt="MedLab Logo" className="medlab-desktop-logo" />
                            <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                                Olá, {formatarNomeSaudacao(usuarioLogado?.nomeCompleto)}!
                            </span>
                        </div>
                        <div className="medlab-desktop-header-actions" style={{ position: 'relative' }}>
                            <button className="medlab-desktop-icon-btn" onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}>
                                <Bell size={22} />
                                <span className="medlab-desktop-badge"></span>
                            </button>
                            <button className="medlab-desktop-icon-btn" onClick={() => { setUsuarioLogado(null); setMostrarNotificacoes(false); setCurrentScreen('landing'); }}>
                                <LogOut size={22} />
                            </button>

                            {mostrarNotificacoes && (
                                <div className="medlab-notifications-dropdown" style={{ position: 'absolute', top: '45px', right: '0', width: '340px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.12)', border: '1px solid #e2e8f0', zIndex: '999', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Notificações</span>
                                        <button style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: '600', color: '#0c9488', cursor: 'pointer', padding: '0' }}>
                                            Marcar todas como lidas
                                        </button>
                                    </div>
                                    <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }} className="medlab-notif-list-scroll">
                                        {listaNotificacoesMock.map((notif) => (
                                            <div key={notif.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 20px', borderBottom: '1px solid #f8fafc', position: 'relative', backgroundColor: notif.lida ? '#ffffff' : '#f8fafc' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e2f1f1', color: '#0c9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0' }}>
                                                    {notif.icone}
                                                </div>
                                                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                    <p style={{ margin: '0', fontSize: '13px', fontWeight: notif.lida ? '400' : '500', color: '#334155', lineHeight: '1.4', textAlign: 'left' }}>
                                                        {notif.texto}
                                                    </p>
                                                </div>
                                                {!notif.lida && (
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '6px', flexShrink: '0' }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="medlab-desktop-main-layout">
                        <main className="medlab-desktop-content-area">

                            <div className="medlab-desktop-search-box">
                                <Search size={22} className="medlab-desktop-search-icon" />
                                <input type="text" placeholder="Procurar Serviço Médico ou Laboratorial" className="medlab-desktop-search-input" />
                            </div>

                            <div className="medlab-desktop-actions-row">
                                <div className="medlab-desktop-action-card-item">
                                    <div className="medlab-desktop-circle green-circle">
                                        <Stethoscope size={36} />
                                    </div>
                                    <div className="medlab-desktop-action-text">
                                        <h4>Consulta</h4>
                                        <p>Agendar atendimento médico</p>
                                    </div>
                                </div>
                                <div className="medlab-desktop-action-card-item">
                                    <div className="medlab-desktop-circle red-circle">
                                        <Activity size={36} />
                                    </div>
                                    <div className="medlab-desktop-action-text">
                                        <h4>Exame</h4>
                                        <p>Agendar análises e exames clínicos</p>
                                    </div>
                                </div>
                            </div>

                            <section className="medlab-desktop-suggestions-section">
                                <h3>Sugestões para você</h3>
                                <p className="desktop-suggestions-subtitle">Baseado no seu histórico de saúde</p>

                                <div
                                    className="medlab-desktop-suggestions-carousel"
                                    ref={suggestionsCarouselRef}
                                    onMouseDown={handleSugMouseDown}
                                    onMouseLeave={handleSugMouseLeave}
                                    onMouseUp={handleSugMouseUp}
                                    onMouseMove={handleMouseMoveSug}
                                >
                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
                                            <Droplet size={24} fill="#ef4444" />
                                        </div>
                                        <span className="medlab-card-tag">Exame</span>
                                        <h4>Hemograma Completo</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                                            <Stethoscope size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Consulta</span>
                                        <h4>Clínico Geral</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                                            <Stethoscope size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Consulta</span>
                                        <h4>Endocrinologista</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                                            <HeartPulse size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Exame</span>
                                        <h4>Tomografia Computadorizada</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#f3e8ff', color: '#a855f7' }}>
                                            <Activity size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Exame</span>
                                        <h4>USG Tireóide</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                                            <Bone size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Exame</span>
                                        <h4>Raio-X</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>
                                            <Search size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Exame</span>
                                        <h4>Dermatoscopia</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#ffe4e6', color: '#e11d48' }}>
                                            <Heart size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Consulta</span>
                                        <h4>Cardiologista</h4>
                                    </div>

                                    <div className="medlab-desktop-suggestion-card-modern border-blue-highlight">
                                        <div className="medlab-card-icon-wrapper" style={{ backgroundColor: '#fae8ff', color: '#c084fc' }}>
                                            <Sparkles size={24} />
                                        </div>
                                        <span className="medlab-card-tag">Consulta</span>
                                        <h4>Dermatologista</h4>
                                    </div>
                                </div>
                            </section>

                        </main>
                    </div>

                    <nav className="medlab-desktop-bottom-nav">
                        <div className="medlab-desktop-bottom-nav-inner" style={{ gap: '28px', justifyContent: 'space-evenly' }}>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'painel-paciente' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('painel-paciente')}
                            >
                                <Home size={22} />
                                <span>Home</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'atendimentos' || currentScreen === 'meus-atendimentos' || currentScreen === 'cancelar-agendamento' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('atendimentos')}
                            >
                                <Calendar size={22} />
                                <span>Atendimentos</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'carrinho' ? 'active' : ''}`}
                                onClick={() => {
                                    if (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) {
                                        alert('O carrinho não está disponível para atendimentos via convênio.');
                                    } else {
                                        setCurrentScreen('carrinho');
                                    }
                                }}
                                style={{
                                    opacity: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 0.5 : 1,
                                    cursor: (typeof convenioAtivado !== 'undefined' && convenioAtivado === true) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <ClipboardList size={22} />
                                <span>Carrinho</span>
                            </button>

                            <button
                                className={`medlab-desktop-nav-btn ${currentScreen === 'perfil' ? 'active' : ''}`}
                                onClick={() => setCurrentScreen('perfil')}
                            >
                                <User size={22} />
                                <span>Perfil</span>
                            </button>

                        </div>
                    </nav>

                </div>
            </div>
        )
    }

    return (
        <div className="medlab-landing">
            <nav className="medlab-navbar">
                <div className="nav-left">
                    <div className="hamburger-dropdown-container">
                        <button className="btn-menu-hamburger">
                            <Menu size={28} color="#000000" strokeWidth={2.5} />
                        </button>
                        <div className="hamburger-menu-panel">
                            <a href="#nossa-historia" className="menu-panel-item" style={menuLinkStyle}>
                                <span>Nossa História</span><ChevronRight size={16} opacity={0.6} />
                            </a>
                            <a href="#fale-conosco" className="menu-panel-item" style={menuLinkStyle}>
                                <span>Fale Conosco</span><ChevronRight size={16} opacity={0.6} />
                            </a>
                            <a href="#trabalhe-conosco" className="menu-panel-item" style={menuLinkStyle}>
                                <span>Trabalhe Conosco</span><ChevronRight size={16} opacity={0.6} />
                            </a>
                            <button
    className="menu-panel-item"
    style={menuLinkStyle}
    onClick={() => setCurrentScreen('login-administrador')}
>
    <span>Área Administrativa</span>
    <ChevronRight size={16} opacity={0.6} />
</button>
                        </div>
                    </div>
                </div>

                <div className="nav-center">
                    <div className="logo-container">
                        <a href="/" className="logo-link" onClick={(e) => { e.preventDefault(); setCurrentScreen('landing'); }}>
                            <img src="/logo-medlab.png" alt="MedLab Logo" className="logo-img" />
                        </a>
                    </div>
                </div>

                <div className="nav-right">
                    <div className="nav-buttons">
                        <div className="dropdown-container">
                            <button className="btn-paciente">
                                <User size={18} className="icon-paciente" strokeWidth={2.2} />
                                Área do Paciente
                            </button>
                            <div className="dropdown-menu menu-paciente">
                                <a href="#login-paciente" onClick={(e) => { e.preventDefault(); setCurrentScreen('login-paciente'); }} style={menuLinkStyle}>
                                    <span>Login</span><ChevronRight size={16} opacity={0.6} />
                                </a>
                                <a href="#cadastro-paciente" onClick={(e) => { e.preventDefault(); setCadastroStep(1); setCurrentScreen('cadastro-paciente'); }} style={menuLinkStyle}>
                                    <span>Cadastrar-se</span><ChevronRight size={16} opacity={0.6} />
                                </a>
                            </div>
                        </div>

                        <div className="dropdown-container">
                            <button className="btn-medico">
                                <BriefcaseMedical size={18} className="icon-medico" strokeWidth={2.2} />
                                Área do Médico
                            </button>
                            <div className="dropdown-menu menu-medico">
                                <a href="#login-medico" onClick={(e) => { e.preventDefault(); setCurrentScreen('login-medico'); }} style={menuLinkStyle}>
                                    <span>Login</span><ChevronRight size={16} opacity={0.6} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="hero-section">
                <h1>Agende sua consulta com facilidade</h1>
                <p>Encontre médicos, especialidades e horários disponíveis</p>
            </header>

            <section className="services-section">
                <h2>Nossos Serviços</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon-container">
                            <BriefcaseMedical size={72} className="icon-green-water" strokeWidth={1.2} />
                        </div>
                        <h3>Consultas</h3>
                        <p>Agende sua consulta com facilidade</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon-container">
                            <ClipboardList size={72} className="icon-green-water" strokeWidth={1.2} />
                        </div>
                        <h3>Exames</h3>
                        <p>Diversos tipos de exames à sua disposição</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon-container">
                            <HeartPulse size={72} className="icon-green-water" strokeWidth={1.2} />
                        </div>
                        <h3>Especialidades</h3>
                        <p>Corpo médico preparado para te atender</p>
                    </div>
                </div>
            </section>

            <div className="integrated-blue-zone">
                <section className="convenios-section">
                    <h2>Convênios Atendidos</h2>
                    <p className="convenios-subtitle">Aceitamos diversos convênios para sua maior comodidade</p>
                    <div
                        className="convenios-grid"
                        ref={carouselRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {['amil', 'bradesco', 'hapvida', 'planserv', 'promedica', 'sulamerica', 'unimed'].map((conv) => (
                            <div className="convenio-card" key={conv}>
                                <div className="convenio-logo-wrapper">
                                    <img src={`/${conv}.png`} alt={conv} className="convenio-logo-img" draggable="false" />
                                </div>
                                <p className="convenio-name">{conv.toUpperCase()}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="cadastro-cta-section">
                    <h2>Pronto para cuidar de você?<br />Cadastre-se agora!</h2>
                    <button className="btn-cadastro-cta" onClick={() => { setCadastroStep(1); setCurrentScreen('cadastro-paciente'); }}>
                        Quero me cadastrar
                    </button>
                </section>
            </div>

            <footer className="medlab-footer">
                <p>MedLab © 2026 • Todos os direitos reservados</p>
            </footer>
        </div>
    )
}

export default App;