import { useState, useRef } from 'react'
import { Stethoscope, FileText, HeartPulse, User, BriefcaseMedical, Menu, ArrowLeft } from 'lucide-react'
import './App.css'

function App() {
    const [currentScreen, setCurrentScreen] = useState('landing');
    const carouselRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDown.current = true;
        carouselRef.current.classList.add('active');
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        carouselRef.current.classList.remove('active');
    };

    const handleMouseUp = () => {
        isDown.current = false;
        carouselRef.current.classList.remove('active');
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setCurrentScreen('painel-paciente');
    };

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

                    <form className="login-form-clean" onSubmit={handleLoginSubmit}>
                        <div className="input-field-group-clean">
                            <label>E-mail:</label>
                            <input type="email" placeholder="Digite seu e-mail" required />
                        </div>

                        <div className="input-field-group-clean">
                            <label>Senha:</label>
                            <input type="password" placeholder="Digite sua senha" required />
                        </div>

                        <div className="form-options-clean">
                            <label className="checkbox-label-clean">
                                <input type="checkbox" /> Lembrar minha senha
                            </label>
                            <a href="#esqueceu-senha" className="forgot-password-clean-link">Esqueceu a senha?</a>
                        </div>

                        <button type="submit" className="btn-login-submit-final">
                            Entrar
                        </button>
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
                            <input type="text" placeholder="Digite seu CRM ou e-mail" required />
                        </div>

                        <div className="input-field-group-clean">
                            <label>Senha:</label>
                            <input type="password" placeholder="Digite sua senha" required />
                        </div>

                        <div className="form-options-clean">
                            <label className="checkbox-label-clean">
                                <input type="checkbox" /> Lembrar minha senha
                            </label>
                            <a href="#esqueceu-senha" className="forgot-password-clean-link">Esqueceu a senha?</a>
                        </div>

                        <button type="submit" className="btn-login-submit-final">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    if (currentScreen === 'painel-paciente') {
        return (
            <div className="patient-dashboard-container">
                <aside className="dashboard-sidebar">
                    <div className="sidebar-logo">
                        <img src="/logo-medlab.png" alt="MedLab Logo" />
                    </div>

                    <div className="patient-profile-summary">
                        <div className="avatar-placeholder">JP</div>
                        <div className="profile-info">
                            <h4>João Silva</h4>
                            <span>Paciente</span>
                        </div>
                    </div>

                    <nav className="sidebar-menu">
                        <a href="#dashboard" className="sidebar-item active">
                            Meus Exames
                        </a>
                        <a href="#consultas" className="sidebar-item">
                            Consultas
                        </a>
                        <a href="#perfil" className="sidebar-item">
                            Meus Dados
                        </a>
                    </nav>

                    <button className="btn-logout" onClick={() => setCurrentScreen('landing')}>
                        Sair do Portal
                    </button>
                </aside>

                <main className="dashboard-content">
                    <header className="content-header">
                        <h2>Área do Paciente — Portal de Resultados</h2>
                        <p>Bem-vindo de volta! Aqui você pode visualizar seus laudos e históricos.</p>
                    </header>

                    <section className="dashboard-grid">
                        <div className="dashboard-card">
                            <h3>Resultados Recentes</h3>
                            <div className="exam-list">
                                <div className="exam-item">
                                    <div className="exam-meta">
                                        <FileText size={24} className="icon-blue-file" />
                                        <div>
                                            <h4>Hemograma Completo</h4>
                                            <span>Dr. Carlos Eduardo — 24/05/2026</span>
                                        </div>
                                    </div>
                                    <button className="btn-download-exam">Visualizar Laudo</button>
                                </div>

                                <div className="exam-item">
                                    <div className="exam-meta">
                                        <FileText size={24} className="icon-blue-file" />
                                        <div>
                                            <h4>Colesterol Total e Frações</h4>
                                            <span>Dra. Amanda Costa — 12/04/2026</span>
                                        </div>
                                    </div>
                                    <button className="btn-download-exam">Visualizar Laudo</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }

    return (
        <div className="medlab-landing">
            <nav className="medlab-navbar">
                <div className="nav-left">
                    <div className="hamburger-dropdown-container">
                        <button className="btn-menu-hamburger" aria-label="Menu de navegação">
                            <Menu size={28} color="#000000" strokeWidth={2.5} />
                        </button>

                        <div className="hamburger-menu-panel">
                            <a href="#nossa-historia" className="menu-panel-item">Nossa História</a>
                            <a href="#fale-conosco" className="menu-panel-item">Fale Conosco</a>
                            <a href="#trabalhe-conosco" className="menu-panel-item">Trabalhe Conosco</a>
                            <a href="#area-administrativa" className="menu-panel-item">Área Administrativa</a>
                        </div>
                    </div>
                </div>

                <div className="nav-center">
                    <div className="logo-container">
                        <a href="/" className="logo-link" aria-label="Ir para a página inicial" onClick={(e) => { e.preventDefault(); setCurrentScreen('landing'); }}>
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
                                <a href="#login-paciente" onClick={(e) => { e.preventDefault(); setCurrentScreen('login-paciente'); }}>Login</a>
                                <a href="#cadastro-paciente">Cadastrar-se</a>
                            </div>
                        </div>

                        <div className="dropdown-container">
                            <button className="btn-medico">
                                <BriefcaseMedical size={18} className="icon-medico" strokeWidth={2.2} />
                                Área do Médico
                            </button>
                            <div className="dropdown-menu menu-medico">
                                <a href="#login-medico" onClick={(e) => { e.preventDefault(); setCurrentScreen('login-medico'); }}>Login</a>
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
                            <Stethoscope size={72} className="icon-green-water" strokeWidth={1.2} />
                        </div>
                        <h3>Consultas</h3>
                        <p>Agende sua consulta com facilidade</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon-container">
                            <FileText size={72} className="icon-green-water" strokeWidth={1.2} />
                        </div>
                        <h3>Exames</h3>
                        <p>Diversos types de exames à sua disposição</p>
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
                        <div className="convenio-card">
                            <div className="convenio-logo-wrapper">
                                <img src="/amil.png" alt="Amil" className="convenio-logo-img" draggable="false" />
                            </div>
                            <p className="convenio-name">Amil</p>
                        </div>
                        <div className="convenio-card">
                            <div className="convenio-logo-wrapper">
                                <img src="/bradesco.png" alt="Bradesco Saúde" className="convenio-logo-img" draggable="false" />
                            </div>
                            <p className="convenio-name">Bradesco Saúde</p>
                        </div>
                        <div className="convenio-card">
                            <div className="convenio-logo-wrapper">
                                <img src="/hapvida.png" alt="Hapvida" className="convenio-logo-img" draggable="false" />
                            </div>
                            <p className="convenio-name">Hapvida</p>
                        </div>
                        <div className="convenio-card">
                            <div className="convenio-logo-wrapper">
                                <img src="/planserv.png" alt="Planserv" className="convenio-logo-img" draggable="false" />
                            </div>
                            <p className="convenio-name">Planserv</p>
                        </div>
                        <div className="convenio-card">
                            <div className="convenio-logo-wrapper">
                                <img src="/promedica.png" alt="Promédica" className="convenio-logo-img" draggable="false" />
                            </div>
                            <p className="convenio-name">Promédica</p>
                        </div>
                        <div className="convenio-card">
                            <div className="convenio-logo-wrapper">
                                <img src="/sulamerica.png" alt="SulAmérica" className="convenio-logo-img" draggable="false" />
                            </div>
                            <p className="convenio-name">SulAmérica</p>
                        </div>
                        <div className="convenio-card">
                            <div className="convenio-logo-wrapper">
                                <img src="/unimed.png" alt="Unimed" className="convenio-logo-img" draggable="false" />
                            </div>
                            <p className="convenio-name">Unimed</p>
                        </div>
                    </div>
                </section>

                <section className="cadastro-cta-section">
                    <h2>
                        Pronto para cuidar de você?<br />
                        Cadastre-se agora!
                    </h2>
                    <button className="btn-cadastro-cta">Quero me cadastrar</button>
                </section>
            </div>

            <footer className="medlab-footer">
                <p>MedLab © 2026 • Todos os direitos reservados</p>
            </footer>
        </div>
    )
}

export default App