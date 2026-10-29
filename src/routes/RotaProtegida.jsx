import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/useAuth";
import Aviso from "../components/common/Aviso";

function RotaProtegida({ children }) {
  const { sessao } = useAuth();

  // sem banco: libera o /admin só durante o desenvolvimento
  if (!supabase) return import.meta.env.DEV ? children : <Navigate to="/login" replace />;

  if (sessao === undefined) return <Aviso>Carregando...</Aviso>;
  return sessao ? children : <Navigate to="/login" replace />;
}

export default RotaProtegida;
