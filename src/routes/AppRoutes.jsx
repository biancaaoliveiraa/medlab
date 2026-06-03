import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginAdministrador from "../pages/LoginAdministrador/LoginAdministrador";
import PainelAdministrador from "../pages/PainelAdministrador/PainelAdministrador";

import UsuariosLista from "../pages/Usuarios/UsuariosLista";
import UsuarioEditar from "../pages/Usuarios/UsuarioEditar";

import MedicosLista from "../pages/Medicos/MedicosLista";
import MedicoCadastro from "../pages/Medicos/MedicoCadastro";
import MedicoEditar from "../pages/Medicos/MedicoEditar";

import ConveniosLista from "../pages/Convenios/ConveniosLista";
import ConvenioCadastro from "../pages/Convenios/ConvenioCadastro";
import ConvenioEditar from "../pages/Convenios/ConvenioEditar";

import Relatorios from "../pages/Relatorios/Relatorios";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAdministrador />} />
        <Route path="/admin" element={<PainelAdministrador />} />

        <Route path="/usuarios" element={<UsuariosLista />} />
        <Route path="/usuarios/editar/:id" element={<UsuarioEditar />} />

        <Route path="/medicos" element={<MedicosLista />} />
        <Route path="/medicos/cadastro" element={<MedicoCadastro />} />
        <Route path="/medicos/editar/:id" element={<MedicoEditar />} />

        <Route path="/convenios" element={<ConveniosLista />} />
        <Route path="/convenios/cadastro" element={<ConvenioCadastro />} />
        <Route path="/convenios/editar/:id" element={<ConvenioEditar />} />

        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;