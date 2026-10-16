import { useState } from 'react'
import AdminHeader from '../../components/layout/AdminHeader'
import StatusBadge from '../../components/common/StatusBadge'
import { obras as obrasIniciais } from '../../mocks/obras'
import { fotoCapa } from '../../utils/obras'

function HistoricoObras() {
  const [obras, setObras] = useState(obrasIniciais)
  const obrasInativas = obras.filter((obra) => !obra.ativa)

  function handleReativar(obraId) {
    setObras((lista) =>
      lista.map((obra) =>
        obra.id === obraId ? { ...obra, ativa: true, status: 'aberto' } : obra
      )
    )
  }

  function handleBack() {
    alert('voltar (ainda nao implementado)')
  }

  function handleLogout() {
    alert('sair (ainda nao implementado)')
  }

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Histórico de Obras" onBack={handleBack} onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto w-full px-5 py-8 flex-1">
        <p className="text-sm text-lm-warm-gray font-sans mb-6 leading-relaxed">
          Obras que foram removidas do acervo ativo. Você pode reativá-las a qualquer momento.
        </p>

        <div className="space-y-3">
          {obrasInativas.map((obra) => (
            <div key={obra.id} className="bg-white border border-lm-border p-4 flex gap-4 items-center">
              <img
                src={fotoCapa(obra.id)}
                alt={obra.artista}
                className="w-14 h-18 object-cover bg-lm-image-bg flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-sans font-semibold text-lm-charcoal">{obra.artista}</p>
                {obra.titulo && (
                  <p className="text-sm italic text-lm-warm-gray font-sans">{obra.titulo}</p>
                )}
                <p className="text-xs text-lm-muted font-sans mt-0.5 flex items-center gap-2">
                  {obra.tecnica} · {obra.ano}
                  <StatusBadge status={obra.status} />
                </p>
              </div>

              <button
                onClick={() => handleReativar(obra.id)}
                className="text-sm font-sans text-emerald-700 border border-emerald-300 px-4 py-2 hover:bg-emerald-50 transition-colors whitespace-nowrap"
              >
                Reativar
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default HistoricoObras
