import { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./common/StatusBadge";
import Back from "../assets/back.png";
import whatsVerde from "../assets/whatsapp-verde.png";

function Detalhe({
  id,
  img,
  fotos,
  artista,
  tecnica,
  ano,
  tipo,
  status,
  titulo,
  valor,
  descricao,
}) {
  const galeria = fotos && fotos.length > 0 ? fotos : [img];
  const [fotoIdx, setFotoIdx] = useState(0);
  const tipoLabel = tipo === "quadro" ? "Quadro" : "Escultura";
  const podeManifestarInteresse = status === "aberto" || status === "em_conversa";
  const specs = [
    ["Técnica", tecnica],
    ["Ano", ano],
    ["Tipo", tipoLabel],
    ...(valor ? [["Valor", valor]] : []),
  ];

  return (
    <div className="flex flex-col gap-5">
      <Link to="/" className="flex items-center gap-2">
        <img src={Back} alt="" />
        <span className="text-sm text-lm-warm-gray">Voltar ao acervo</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-8 md:gap-15">
        <div>
          <img
            src={galeria[fotoIdx]}
            alt={`${artista}, ${tecnica}`}
            className="w-full md:w-auto md:h-150 object-contain"
          />
          {galeria.length > 1 && (
            <div className="flex gap-2 mt-3">
              {galeria.map((foto, i) => (
                <button
                  key={foto}
                  onClick={() => setFotoIdx(i)}
                  className={`w-16 h-16 overflow-hidden bg-lm-image-bg transition-all ${
                    i === fotoIdx ? "ring-2 ring-lm-charcoal" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={foto} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <StatusBadge status={status} />
              <h1 className="font-serif font-medium text-3xl border-b border-b-lm-border pb-5">
                {artista}
              </h1>
              {titulo && <p className="italic text-sm text-lm-warm-gray">{titulo}</p>}
            </div>

            <div className="flex flex-col gap-3 border-b border-b-lm-border pb-5">
              {specs.map(([label, info]) => (
                <div key={label} className="flex items-center justify-between">
                  <h4 className="uppercase text-xs text-lm-warm-gray">{label}</h4>
                  <p className="text-xs">{info}</p>
                </div>
              ))}
            </div>

            {descricao && <p className="text-sm text-lm-warm-gray leading-relaxed">{descricao}</p>}
          </div>

          <div>
            <div className="flex flex-col gap-3 border-b border-b-lm-border pb-6">
              {podeManifestarInteresse ? (
                <>
                  <Link
                    to={`/form/${id}`}
                    className="block bg-lm-red/90 text-white p-4 text-center hover:bg-lm-red"
                  >
                    Tenho interesse
                  </Link>
                  <p className="text-xs text-center">
                    Ao clicar, você será convidado a preencher um breve formulário. Suas informações
                    serão enviadas diretamente para a galeria, que entrará em contato para dar
                    continuidade.
                  </p>
                </>
              ) : (
                <p className="bg-lm-admin-bg border border-lm-border text-lm-warm-gray text-sm p-4 text-center">
                  Esta obra não está disponível para manifestação de interesse no momento.
                </p>
              )}
            </div>
            <div className="pt-5 flex flex-col gap-4">
              <p className="text-center text-xs">Prefere falar diretamente?</p>
              <a
                className="block border border-emerald-400 hover:bg-emerald-400/10"
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center justify-center p-4 gap-2">
                  <img src={whatsVerde} alt="" />
                  <span className="text-[#1A7A3C]">Falar pelo WhatsApp</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalhe;
