import { useState } from 'react'
import AdminHeader from '../../components/layout/AdminHeader'

const PASSOS = [1, 2, 3]
const TITULO_PASSO = {
  1: 'Fotos da obra',
  2: 'Informações principais',
  3: 'Detalhes e valor',
}

function CadastroObra() {
  const [passo] = useState(1)
  const [fotosPreview] = useState([
    'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&h=1100&fit=crop&auto=format',
  ])
  const [fotoCapaIdx, setFotoCapaIdx] = useState(0)

  function handleCancelar() {
    alert('cancelar (ainda nao implementado)')
  }

  function handleLogout() {
    alert('sair (ainda nao implementado)')
  }

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Cadastrar Nova Obra" onBack={handleCancelar} onLogout={handleLogout} />

      <main className="max-w-2xl mx-auto w-full px-5 py-8 flex-1">
        <div className="flex items-center gap-2 mb-8">
          {PASSOS.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm font-sans font-semibold transition-colors ${
                  s === passo
                    ? 'bg-lm-charcoal text-white'
                    : s < passo
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-lm-border text-lm-muted'
                }`}
              >
                {s < passo ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && <div className={`h-px w-8 ${s < passo ? 'bg-emerald-600' : 'bg-lm-border'}`} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-lm-warm-gray font-sans">{TITULO_PASSO[passo]}</span>
        </div>

        <div className="bg-white border border-lm-border p-6 md:p-8">
          {passo === 1 && (
            <div>
              <h2 className="font-sans font-semibold text-xl text-lm-charcoal mb-1">Fotos da obra</h2>
              <p className="text-sm text-lm-warm-gray font-sans mb-6 leading-relaxed">
                Adicione as fotos da obra. Você pode escolher qual será a foto principal (capa).
              </p>

              <div className="border-2 border-dashed border-lm-border-dashed hover:border-lm-charcoal transition-colors p-8 text-center mb-6 cursor-pointer">
                <svg className="w-10 h-10 text-lm-muted mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="font-sans font-medium text-lm-charcoal text-sm">Clique aqui para selecionar fotos</p>
                <p className="text-xs text-lm-muted font-sans mt-1">JPG, PNG ou WEBP · Até 20 MB por foto</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {fotosPreview.map((foto, i) => (
                  <div key={foto} className="relative group">
                    <img src={foto} alt={`Foto ${i + 1}`} className="w-full aspect-square object-cover bg-lm-image-bg" />
                    <button
                      onClick={() => setFotoCapaIdx(i)}
                      className={`absolute bottom-2 left-2 text-[10px] font-sans font-semibold px-2 py-0.5 transition-colors ${
                        i === fotoCapaIdx
                          ? 'bg-lm-charcoal text-white'
                          : 'bg-white/80 text-lm-charcoal hover:bg-white'
                      }`}
                    >
                      {i === fotoCapaIdx ? '★ Capa' : 'Tornar capa'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CadastroObra
