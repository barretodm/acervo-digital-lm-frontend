import { useParams, Navigate } from "react-router-dom";
import Aviso from "../../components/common/Aviso";
import Form from "./Form";
import { useObra } from "../../hooks/useObras";

function FormPage() {
  const { id } = useParams();
  const { data: obra, loading, error } = useObra(id);
  if (loading) return <Aviso>Carregando...</Aviso>;
  if (error || !obra) return <Navigate to="/" replace />;
  return <Form obra={obra} />;
}

export default FormPage;
