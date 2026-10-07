import whats from '../assets/whatsapp_icon.png'
function Footer({img}) {
    return (
        <footer className="text-[rgb(160,152,144)] bg-[#1C1B18] pt-10 pb-3 text-sm">
            <div className="container mx-auto px-10 md:px-20 lg:px-30">
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                <div className="flex flex-col pb-10">
                    <img src={img} alt="" className="h-24 w-24 p-2 bg-white rounded-full object-contain"/>
                    <p className='pt-3'>
                        Rua Torres Câmara, 192 — Aldeota
                        <br/>
                        Fortaleza - CE, 60150-060
                    </p>
                </div>
                <div className='flex flex-col gap-3'>
                    <span className="flex gap-1 items-center">
                        <img src={whats} alt="logo whatsapp" className='aspect-square h-3.5 w-auto'/>
                        <a href="https://wa.me/5511999999999">(11) 99999-9999 — WhatsApp</a>
                    </span>
                    <span>
                        <a href="mailto:contato@lmarte.com.br">contato@lmarte.com.br</a>
                    </span>
                    <span>
                        <p>Seg – Sex, 10h – 19h</p>
                    </span>
                </div>
            </div>
            <p className="text-left border-t pt-4 text-xs">&copy; 2026 LM COMERCIO DE OBJETO DE ARTE LTDA. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}export default Footer