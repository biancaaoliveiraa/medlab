import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import "./MedicosLista.css";

function MedicosLista() {
  const navigate = useNavigate();

  const medicos = [
    {
      id: 1,
      nome: "Dr. Ricardo Almeida",
      especialidade: "Cardiologia",
      ativo: true
    },
    {
      id: 2,
      nome: "Dra. Camila Torres",
      especialidade: "Pediatria",
      ativo: true
    },
    {
      id: 3,
      nome: "Dr. Felipe Rocha",
      especialidade: "Ortopedia",
      ativo: false
    }
  ];

  const [busca, setBusca] = useState("");

  const sugestoes = medicos.filter((medico) =>
    medico.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirCadastro() {
    navigate("/medicos/cadastro");
  }

  function abrirEditor(id) {
    navigate(`/medicos/editar/${id}`);
  }

  return (
    <LayoutAdmin>
      <div className="medicos-container">
        <div className="medicos-header">
          <h1>Gerenciador de Médicos</h1>
        </div>

        <div className="busca-medicos">
          <div className="campo-busca-medico">
            <input
              type="text"
              placeholder="Buscar médico..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            {busca && (
              <div className="lista-sugestoes-medico">
                {sugestoes.map((medico) => (
                  <button
                    key={medico.id}
                    type="button"
                    className="item-sugestao-medico"
                    onClick={() => abrirEditor(medico.id)}
                  >
                    <strong>{medico.nome}</strong>
                    <span>{medico.especialidade}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tabela-medicos">
          <div className="titulo-listagem">
            <h2>Listagem Geral</h2>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Especialização</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {medicos.map((medico) => (
                <tr key={medico.id}>
                  <td>{medico.nome}</td>

                  <td>{medico.especialidade}</td>

                  <td>
                    <label className="switch-medico">
                      <input
                        type="checkbox"
                        defaultChecked={medico.ativo}
                      />
                      <span className="slider-medico"></span>
                    </label>
                  </td>

                  <td className="acoes-medico">
                    <button
                      type="button"
                      className="editar-medico"
                      onClick={() => abrirEditor(medico.id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="excluir-medico"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            className="botao-adicionar-medico"
            onClick={abrirCadastro}
          >
            <FaPlus />
            Adicionar médico
          </button>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default MedicosLista;