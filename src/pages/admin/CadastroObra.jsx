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

        <div className="bg-white border border-lm-border p-6 md:p-8"></div>
      </main>
    </div>
  )
}

export default CadastroObra
