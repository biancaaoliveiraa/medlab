import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import "./UsuariosLista.css";

function UsuariosLista() {
  const navigate = useNavigate();

  const usuarios = [
    {
      id: 1,
      nome: "João Silva",
      convenio: "Unimed",
      ativo: true
    },
    {
      id: 2,
      nome: "Maria Souza",
      convenio: "Bradesco Saúde",
      ativo: false
    },
    {
      id: 3,
      nome: "Pedro Lima",
      convenio: "Hapvida",
      ativo: true
    },
    {
      id: 4,
      nome: "José Santos",
      convenio: "Unimed",
      ativo: true
    },
    {
      id: 5,
      nome: "Juliana Lima",
      convenio: "SulAmérica",
      ativo: true
    }
  ];

  const [busca, setBusca] = useState("");

  const sugestoes = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirEditor(id) {
    navigate(`/usuarios/editar/${id}`);
  }

  return (
    <LayoutAdmin>
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h1>Gerenciador de Usuários</h1>
        </div>

        <div className="busca-container">
          <div className="campo-busca">
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            {busca && (
              <div className="lista-sugestoes">
                {sugestoes.map((usuario) => (
                  <button
                    key={usuario.id}
                    type="button"
                    className="item-sugestao"
                    onClick={() => abrirEditor(usuario.id)}
                  >
                    <strong>{usuario.nome}</strong>
                    <span>{usuario.convenio}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Convênio</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.convenio}</td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" defaultChecked={usuario.ativo} />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="acoes">
                    <button
                      className="editar-btn"
                      type="button"
                      onClick={() => abrirEditor(usuario.id)}
                    >
                      <FaEdit />
                    </button>

                    <button className="excluir-btn" type="button">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default UsuariosLista;