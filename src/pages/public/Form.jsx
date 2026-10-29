import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import logo from "../../assets/logo-lm-v3.png";
import Backarrow from "../../assets/back.png";
import { enviarInteresse } from "../../services/obras";

const inputCls = "bg-white p-3 mb-4";
const labelCls = "text-xs uppercase mb-1";

function Form({ obra }) {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErro(false);
    const f = new FormData(e.target);
    try {
      await enviarInteresse({
        obra_id: obra.id,
        nome: f.get("nome"),
        email: f.get("email"),
        telefone: f.get("telefone"),
        mensagem: f.get("mensagem") || null,
        consentimento_lgpd: f.get("lgpd") === "on",
      });
      setEnviado(true);
    } catch {
      setErro(true);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header img={logo} />
      <Main>
        <div className="w-full max-w-120 m-auto flex flex-col gap-6">
          <Link to={`/obra/${obra.id}`} className="flex gap-2 items-center">
            <img src={Backarrow} alt="" />
            <span className="text-sm text-lm-warm-gray">Voltar à obra</span>
          </Link>

          <div className="flex gap-4 items-center bg-white p-3">
            <img src={obra.img} alt="" className="h-20 w-16 object-cover" />
            <div>
              <p className="font-medium">{obra.artista}</p>
              <div className="flex gap-2 text-sm text-lm-warm-gray">
                <span>{obra.tecnica}</span>
                <p>-</p>
                <span>{obra.ano}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif">Manifestação de interesse</h2>
            <p className="text-sm">
              Preencha seus dados. A galeria entrará em contato diretamente com você para continuar
              a conversa.
            </p>
          </div>

          {enviado ? (
            <p className="p-4 bg-white">
              Obrigado! Recebemos seu interesse e entraremos em contato em breve.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="nome" className={labelCls}>
                Nome completo *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Seu nome"
                required
                className={inputCls}
              />

              <label htmlFor="email" className={labelCls}>
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                required
                className={inputCls}
              />

              <label htmlFor="telefone" className={labelCls}>
                Telefone / WhatsApp *
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(11) 99999-9999"
                required
                className={inputCls}
              />

              <label htmlFor="mensagem" className={labelCls}>
                Mensagem (opcional)
              </label>
              <textarea id="mensagem" name="mensagem" rows={4} className={inputCls} />

              <label htmlFor="lgpd" className="flex gap-2 text-xs cursor-pointer mb-4">
                <input type="checkbox" id="lgpd" name="lgpd" required className="mt-0.5" />
                <span>
                  Concordo que a galeria LM Escritório de Arte armazene meus dados para fins de
                  atendimento relacionado a esta obra, conforme a Lei Geral de Proteção de Dados
                  (LGPD). *
                </span>
              </label>

              {erro && (
                <p className="text-sm text-lm-red mb-3">Erro ao enviar. Tente novamente.</p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="p-4 bg-lm-red text-white hover:bg-lm-red/90 disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}
        </div>
      </Main>
      <Footer img={logo} />
    </div>
  );
}

export default Form;
