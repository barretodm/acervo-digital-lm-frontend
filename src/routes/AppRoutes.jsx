import { Routes, Route, Navigate } from "react-router-dom";
import RotaProtegida from "./RotaProtegida";
import Vitrine from "../pages/public/Vitrine";
import ObraPage from "../pages/public/ObraPage";
import FormPage from "../pages/public/FormPage";
import Login from "../pages/public/Login";
import Administrador from "../pages/admin/ListaObras";
import InteressesObra from "../pages/admin/InteressesObra";
import HistoricoObras from "../pages/admin/HistoricoObras";
import CadastroObra from "../pages/admin/CadastroObra";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Vitrine />} />
      <Route path="/obra/:id" element={<ObraPage />} />
      <Route path="/form/:id" element={<FormPage />} />
      <Route
        path="/login"
        element={
          <div className="flex min-h-screen items-center justify-center bg-lm-ivory p-4">
            <Login />
          </div>
        }
      />
      <Route
        path="/admin"
        element={
          <RotaProtegida>
            <Administrador />
          </RotaProtegida>
        }
      />
      <Route
        path="/admin/interesses/:id"
        element={
          <RotaProtegida>
            <InteressesObra />
          </RotaProtegida>
        }
      />
      <Route
        path="/admin/historico"
        element={
          <RotaProtegida>
            <HistoricoObras />
          </RotaProtegida>
        }
      />
      <Route
        path="/admin/cadastro"
        element={
          <RotaProtegida>
            <CadastroObra />
          </RotaProtegida>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
