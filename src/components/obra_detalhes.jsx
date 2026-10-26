import { Link } from "react-router-dom"
import Back from '../assets/back.png'
import whatsVerde from '../assets/whatsapp-verde.png'

function Detalhe({ id, img, artista, tecnica, ano, tipo }) {
  const specs = [["Técnica", tecnica], ["Ano", ano], ["Tipo", tipo]];

  return (
    <div className="flex flex-col gap-5">
      <Link to="/" className="flex items-center gap-2">
        <img src={Back} alt="" />
        <span className="text-sm text-[#6b6460]">Voltar ao acervo</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-8 md:gap-15">
        <img
          src={img}
          alt={`${artista}, ${tecnica}`}
          className="w-full md:w-auto md:h-150 object-contain"
        />

        <div className="flex-1 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-5">
            <h1 className="font-serif font-medium text-3xl border-b border-b-[#E0DBD4] pb-5">{artista}</h1>
            <div className="flex flex-col gap-3 border-b border-b-[#E0DBD4] pb-5">
              {specs.map(([label, valor]) => (
                <div key={label} className="flex items-center justify-between">
                  <h4 className="uppercase text-xs text-[#6D6662]">{label}</h4>
                  <p className="text-xs">{valor}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-3 border-b border-b-[#E0DBD4] pb-6">
              <Link
                to={`/form/${id}`}
                className="block bg-[#C41230]/90 text-white p-4 text-center hover:bg-[#C41230]"
              >
                Tenho interesse
              </Link>
              <p className="text-xs text-center">
                Ao clicar, você será convidado a preencher um breve formulário. Suas informações serão
                enviadas diretamente para a galeria, que entrará em contato para dar continuidade.
              </p>
            </div>
            <div className="pt-5 flex flex-col gap-4">
              <p className="text-center text-xs">Prefere falar diretamente?</p>
              <a
                className="block border border-emerald-400 hover:bg-emerald-400/10"
                href="https://wa.me/5511999999999" target="_blank" rel="noreferrer"
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
  )
}

export default Detalhe