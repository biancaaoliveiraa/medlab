import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import "./Convenios.css";

function ConveniosLista() {
  const navigate = useNavigate();

  const convenios = [
    {
      id: 1,
      nome: "Bradesco Saúde",
      codigo: "BRD001",
      ativo: true
    },
    {
      id: 2,
      nome: "Unimed",
      codigo: "UNI001",
      ativo: true
    },
    {
      id: 3,
      nome: "SulAmérica",
      codigo: "SUL001",
      ativo: true
    },
    {
      id: 4,
      nome: "Amil",
      codigo: "AML001",
      ativo: false
    }
  ];

  const [busca, setBusca] = useState("");

  const sugestoes = convenios.filter((convenio) =>
    convenio.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirEditor(id) {
    navigate(`/convenios/editar/${id}`);
  }

  function abrirCadastro() {
    navigate("/convenios/cadastro");
  }

  return (
    <LayoutAdmin>
      <div className="convenios-container">
        <div className="convenios-header">
          <h1>Gerenciador de Convênios</h1>
        </div>

        <div className="busca-convenios">
          <div className="campo-busca-convenio">
            <input
              type="text"
              placeholder="Pesquisar convênio..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            {busca && (
              <div className="lista-sugestoes-convenio">
                {sugestoes.map((convenio) => (
                  <button
                    key={convenio.id}
                    type="button"
                    className="item-sugestao-convenio"
                    onClick={() => abrirEditor(convenio.id)}
                  >
                    <strong>{convenio.nome}</strong>
                    <span>{convenio.codigo}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lista-convenios">
          {convenios.map((convenio) => (
            <div className="card-convenio" key={convenio.id}>
              <div>
                <strong>{convenio.nome}</strong>
                <span>{convenio.codigo}</span>
              </div>

              <div className="acoes-convenio">
                <button
                  type="button"
                  className="editar-convenio"
                  onClick={() => abrirEditor(convenio.id)}
                >
                  <FaEdit />
                </button>

                <label className="switch-convenio">
                  <input type="checkbox" defaultChecked={convenio.ativo} />
                  <span className="slider-convenio"></span>
                </label>

                <button type="button" className="excluir-convenio">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="botao-novo-convenio"
          onClick={abrirCadastro}
        >
          <FaPlus />
          Novo Convênio
        </button>
      </div>
    </LayoutAdmin>
  );
}

export default ConveniosLista;