import { useState } from "react";
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Footer from "../../components/layout/Footer";
import Faixa from "../../components/common/Faixa";
import Filtro from "../../components/common/Filtro";
import Card from "../../components/common/Card";
import GridContainer from "../../components/ui/GridContainer";
import Aviso from "../../components/common/Aviso";
import { useObras } from "../../hooks/useObras";
import logo from "../../assets/logo-lm-v3.png";

function Vitrine() {
  const { data: obras, loading, error } = useObras();
  const [tipo, setTipo] = useState("todos");
  const [tecnica, setTecnica] = useState("");

  const lista = obras ?? [];
  const tecnicas = [...new Set(lista.map((o) => o.tecnica))];
  const filtradas = lista.filter(
    (o) => (tipo === "todos" || o.tipo === tipo) && (tecnica === "" || o.tecnica === tecnica),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header img={logo} />
      <Faixa />
      <Main>
        <Filtro
          numeroObras={filtradas.length}
          tipo={tipo}
          setTipo={setTipo}
          tecnica={tecnica}
          setTecnica={setTecnica}
          tecnicas={tecnicas}
        />
        {loading && <Aviso>Carregando obras...</Aviso>}
        {error && <Aviso>Não foi possível carregar as obras. Tente novamente.</Aviso>}
        {!loading && !error && filtradas.length === 0 && <Aviso>Nenhuma obra encontrada.</Aviso>}
        <GridContainer>
          {filtradas.map((o) => (
            <Card key={o.id} {...o} />
          ))}
        </GridContainer>
      </Main>
      <Footer img={logo} />
    </div>
  );
}

export default Vitrine;
