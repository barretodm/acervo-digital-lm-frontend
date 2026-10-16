import { useState } from 'react'
import AdminHeader from '../../components/layout/AdminHeader'
import { obras as obrasIniciais } from '../../mocks/obras'
import { interesses } from '../../mocks/interesses'
import { STATUS } from '../../constants/status'
import { fotoCapa } from '../../utils/obras'

function InteressesObra({ obraId = 'c5494231-4efc-48b3-9466-bcb91ca5cbd9' }) {
  const [obras, setObras] = useState(obrasIniciais)
  const obra = obras.find((item) => item.id === obraId)
  const interessesDaObra = interesses.filter((interesse) => interesse.obra_id === obraId)

  function handleStatusChange(novoStatus) {
    setObras((lista) =>
      lista.map((item) => (item.id === obraId ? { ...item, status: novoStatus } : item))
    )
  }

  function handleBack() {
    alert('voltar (ainda nao implementado)')
  }

  function handleLogout() {
    alert('sair (ainda nao implementado)')
  }

  if (!obra) return null

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Interesses Recebidos" onBack={handleBack} onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto w-full px-5 py-8 flex-1">
        <div className="bg-white border border-lm-border p-4 flex gap-4 items-center mb-6">
          <img
            src={fotoCapa(obra.id)}
            alt={obra.artista}
            className="w-14 h-18 object-cover bg-lm-image-bg flex-shrink-0"
          />
          <div className="flex-1">
            <p className="font-sans font-semibold text-lm-charcoal text-lg">{obra.artista}</p>
            {obra.titulo && (
              <p className="font-sans italic text-sm text-lm-warm-gray">{obra.titulo}</p>
            )}
            <p className="font-sans text-xs text-lm-muted mt-0.5">
              {obra.tecnica} · {obra.ano}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-lm-muted font-sans mb-1">Status atual</p>
            <select
              value={obra.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border border-lm-border text-sm text-lm-charcoal px-3 py-2 bg-lm-ivory focus:outline-none"
            >
              {STATUS.map((status) => (
                <option key={status.chave} value={status.chave}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="font-sans font-semibold text-lm-charcoal text-base mb-4">
          {interessesDaObra.length === 0
            ? 'Nenhum interesse recebido'
            : `${interessesDaObra.length} interesse${interessesDaObra.length > 1 ? 's' : ''} recebido${interessesDaObra.length > 1 ? 's' : ''}`}
        </h2>

        <div className="space-y-3">
          {interessesDaObra.map((interesse) => (
            <div key={interesse.id} className="bg-white border border-lm-border p-5">
              <p className="font-sans font-semibold text-lm-charcoal text-base">{interesse.nome}</p>
              <p className="text-xs text-lm-muted font-sans mt-0.5">
                Recebido em {new Date(interesse.criado_em).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default InteressesObra
