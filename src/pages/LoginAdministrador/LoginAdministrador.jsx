import { useNavigate } from "react-router-dom";
import logoMedLab from "../../assets/images/logo-medlab.png";
import "./LoginAdministrador.css";

function LoginAdministrador() {
  const navigate = useNavigate();

  function entrarNoSistema(event) {
    event.preventDefault();
    navigate("/admin");
  }

  return (
    <main className="pagina-login-admin">
      <section className="card-login-admin">
        <button className="voltar-login" type="button">
          ← Voltar
        </button>

        <div className="area-logo-login">
          <img src={logoMedLab} alt="MedLab" />
        </div>

        <h1>Administrador</h1>

        <form className="form-login-admin" onSubmit={entrarNoSistema}>
          <label>Usuário:</label>
          <input type="text" placeholder="Digite seu nome de usuário" />

          <label>Senha:</label>
          <input type="password" placeholder="Digite sua senha" />

          <div className="lembrar-login">
            <input type="checkbox" id="lembrar" />
            <label htmlFor="lembrar">Lembrar minha senha</label>
          </div>

          <button className="botao-login-admin" type="submit">
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginAdministrador;