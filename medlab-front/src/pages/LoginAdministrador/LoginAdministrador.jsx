import { useState } from "react";
import logoMedlab from "../../assets/images/logo-medlab.png";
import "./LoginAdministrador.css";

function LoginAdministrador({ setCurrentScreen }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [erroUsuario, setErroUsuario] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  function entrar(event) {
    event.preventDefault();

    let formularioValido = true;

    setErroUsuario("");
    setErroSenha("");

    if (!usuario.trim()) {
      setErroUsuario("O usuário é obrigatório.");
      formularioValido = false;
    }

    if (!senha.trim()) {
      setErroSenha("A senha é obrigatória.");
      formularioValido = false;
    }

    if (!formularioValido) {
      return;
    }

    setCurrentScreen("painel-administrador");
  }

  return (
    <div className="login-admin-pagina">
      <button
        type="button"
        className="login-voltar"
        onClick={() => setCurrentScreen("landing")}
      >
        ← Voltar
      </button>

      <form className="login-admin-card" onSubmit={entrar}>
        <div className="login-logo-area">
          <img src={logoMedlab} alt="Logo MedLab" />
        </div>

        <h1>Administrador</h1>

        <div className="login-campo">
          <label>Usuário:</label>

          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
          />

          {erroUsuario && (
            <span className="mensagem-erro-login">
              {erroUsuario}
            </span>
          )}
        </div>

        <div className="login-campo">
          <label>Senha:</label>

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          {erroSenha && (
            <span className="mensagem-erro-login">
              {erroSenha}
            </span>
          )}
        </div>

        <label className="login-lembrar">
          <input type="checkbox" />
          <span>Lembrar minha senha</span>
        </label>

        <button type="submit" className="login-botao">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginAdministrador;