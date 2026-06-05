import "./CardMenu.css";

function CardMenu({ titulo, descricao, icone, tela, setCurrentScreen }) {
  return (
    <button
      type="button"
      className="card-menu"
      onClick={() => setCurrentScreen(tela)}
    >
      <div className="card-menu-icon">{icone}</div>

      <div className="card-menu-info">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>
    </button>
  );
}

export default CardMenu;