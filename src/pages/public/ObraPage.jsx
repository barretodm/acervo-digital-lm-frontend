import { useParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Footer from "../../components/layout/Footer";
import Aviso from "../../components/common/Aviso";
import Detalhe from "./Detalhe";
import { useObra } from "../../hooks/useObras";
import logo from "../../assets/logo-lm-v3.png";

function ObraPage() {
  const { id } = useParams();
  const { data: obra, loading, error } = useObra(id);

  return (
    <div className="flex min-h-screen flex-col">
      <Header img={logo} />
      <Main>
        {loading && <Aviso>Carregando...</Aviso>}
        {error && <Aviso>Obra não encontrada.</Aviso>}
        {obra && <Detalhe {...obra} />}
      </Main>
      <Footer img={logo} />
    </div>
  );
}

export default ObraPage;
