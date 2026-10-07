import { Link } from "react-router-dom"
import Back from '../assets/back.png'
import galoAldemir from '../assets/galo-aldemir.jpg'
import whatsVerde from '../assets/whatsapp-verde.png'

function Detalhe(img, artista, tecnica, ano, tipo) {
    return(
        <div className="flex flex-col gap-5">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <img src={Back} alt="" />
                    <p className="text-sm text-[#6b6460]">Voltar ao acervo</p>
                </div>
            </Link>

            <div className="flex gap-15">
                <img src={galoAldemir} alt="" className="h-150 w-auto"/>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="specs flex flex-col gap-5">
                        <h1 className="artista font-serif font-medium text-3xl border-b border-b-[#E0DBD4] pb-5">{artista}Rivane Neuenschwander</h1>
                        <div className="flex flex-col gap-3 border-b border-b-[#E0DBD4] pb-5">
                            <span className="flex items-center justify-between">
                                <h4 className="uppercase text-xs text-[#6D6662]">Técnica</h4>
                                <p className="text-xs">{tecnica}Aquarela sobre papel algodão</p>
                            </span>
                            <span className="flex items-center justify-between">
                                <h4 className="uppercase text-xs text-[#6D6662]">Ano</h4>
                                <p className="text-xs">{ano}2020</p>
                            </span>
                            <span className="flex items-center justify-between">
                                <h4 className="uppercase text-xs text-[#6D6662]">Tipo</h4>
                                <p className="text-xs">{tipo}Quadro</p>
                            </span>
                        </div>
                    </div>
                    <div className="contact">
                        <div className="form flex flex-col gap-3 border-b border-b-[#E0DBD4] pb-6">
                            <Link>
                                <div className="bg-[#C41230]/90 text-white p-4 text-center hover:bg-[#C41230]">
                                    Tenho interesse
                                </div>
                            </Link>
                            <p className="text-xs text-center">Ao clicar, você será convidado a preencher um breve formulário.
                                <br />
                                 Suas informações serão enviadas por e-mail diretamente para a 
                                 <br />
                                 galeria, que entrará em contato para dar continuidade.
                            </p>
                        </div>
                        <div className="wpp pt-5 flex flex-col gap-4">
                            <p className="text-center text-xs">Prefere falar diretamente?</p>
                            <a className="block border border-emerald-400 hover:bg-emerald-400/10" href="https://wa.me/5511999999999">
                                <div className="flex items-center justify-center p-4 gap-2">
                                    <img src={whatsVerde} alt="" />
                                    <p className="text-[#1A7A3C]">Falar pelo WhatsApp</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}export default Detalhe