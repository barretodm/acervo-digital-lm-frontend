import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import logo from "../../assets/logo-lm-v3.png";

function Login() {
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEntrando(true);
    setErro("");
    if (!supabase) {
      setEntrando(false);
      return navigate("/admin");
    }
    const f = new FormData(e.target);
    const { error } = await supabase.auth.signInWithPassword({
      email: f.get("email"),
      password: f.get("password"),
    });
    setEntrando(false);
    if (error) return setErro("E-mail ou senha inválidos.");
    navigate("/admin");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-max mx-auto">
        <img src={logo} alt="LM Escritório de Arte" className="h-18 w-auto" />
      </div>
      <div className="p-4 sm:p-8 bg-white flex flex-col gap-6 min-h-100 md:min-h-110 w-70 sm:w-80 md:w-90 lg:w-100">
        <div className="flex flex-col">
          <span>Acesso à galeria</span>
          <p className="text-sm">Área exclusiva para o galerista.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-sm">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Digite seu email"
              className="p-4 bg-lm-ivory"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-sm">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Digite sua senha"
              className="p-4 bg-lm-ivory"
            />
          </div>
          {erro && <p className="text-sm text-lm-red">{erro}</p>}
          <button
            type="submit"
            disabled={entrando}
            className="p-4 mt-auto bg-lm-red text-white disabled:opacity-60"
          >
            {entrando ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div>
          <Link to="/">Retornar à página principal</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
