import "./CardMenu.css";
import { Link } from "react-router-dom";

function CardMenu({ titulo, descricao, icone, rota }) {
  return (
    <Link to={rota} className="card-menu">
      <div className="card-menu-icon">
        {icone}
      </div>

      <div className="card-menu-info">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>
    </Link>
  );
}

export default CardMenu;