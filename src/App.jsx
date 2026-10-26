import { useEffect, useState } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';

import { supabase } from './services/supabase';
import { useObras, useObra } from './hooks/useObras';

import Header from './components/header.jsx';
import Main from './components/main.jsx';
import GridContainer from './components/grid.jsx';
import Footer from './components/footer.jsx';
import Card from './components/card.jsx';
import Login from './components/login_card.jsx';
import Faixa from './components/faixa_titulo.jsx';
import Detalhe from './components/obra_detalhes.jsx';
import Filtro from './components/filtro.jsx';
import Form from './pages/public/form.jsx';
import Administrador from './pages/admin/ListaObras.jsx';

import logo from './assets/logo-lm-v3.png';

function Aviso({ children }) {
  return <p className="py-10 text-center text-sm text-[#6B6460]">{children}</p>;
}

function Home() {
  const { data: obras, loading, error } = useObras();
  const [tipo, setTipo] = useState('todos');
  const [tecnica, setTecnica] = useState('');

  const lista = obras ?? [];
  const tecnicas = [...new Set(lista.map((o) => o.tecnica))];
  const filtradas = lista.filter(
    (o) =>
      (tipo === 'todos' || o.tipo === tipo) &&
      (tecnica === '' || o.tecnica === tecnica),
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
        {error && (
          <Aviso>Não foi possível carregar as obras. Tente novamente.</Aviso>
        )}
        {!loading && !error && filtradas.length === 0 && (
          <Aviso>Nenhuma obra encontrada.</Aviso>
        )}
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

function FormPage() {
  const { id } = useParams();
  const { data: obra, loading, error } = useObra(id);
  if (loading) return <Aviso>Carregando...</Aviso>;
  if (error || !obra) return <Navigate to="/" replace />;
  return <Form obra={obra} />;
}

function RotaProtegida({ children }) {
  const [sessao, setSessao] = useState(undefined);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSessao(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSessao(s),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  // sem banco: libera o /admin só durante o desenvolvimento
  if (!supabase)
    return import.meta.env.DEV ? children : <Navigate to="/login" replace />;

  if (sessao === undefined) return <Aviso>Carregando...</Aviso>;
  return sessao ? children : <Navigate to="/login" replace />;
}

// Página provisória do galerista. Substitua pela página real de interesses/obras.
function Admin() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header img={logo} />
      <Main>
        <h1 className="text-2xl font-serif mb-4">Área do galerista</h1>
        <button
          type="button"
          onClick={() => supabase?.auth.signOut()}
          className="p-3 bg-[#1C1B18] text-white text-sm"
        >
          Sair
        </button>
      </Main>
      <Footer img={logo} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/obra/:id" element={<ObraPage />} />
      <Route path="/form/:id" element={<FormPage />} />
      <Route
        path="/login"
        element={
          <div className="flex min-h-screen items-center justify-center bg-[#F5F3EF] p-4">
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
