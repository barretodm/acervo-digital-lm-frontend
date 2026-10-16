import AdminHeader from '../../components/layout/AdminHeader'
import StatusBadge from '../../components/common/StatusBadge'
import { obras } from '../../mocks/obras'
import { fotosObra } from '../../mocks/fotosObra'
import { interesses } from '../../mocks/interesses'

const STATUS = [
  { chave: 'aberto', label: 'Disponível' },
  { chave: 'em_conversa', label: 'Em conversa' },
  { chave: 'reservado', label: 'Reservado' },
  { chave: 'vendido', label: 'Vendido' },
]

function fotoCapa(obraId) {
  return fotosObra.find((foto) => foto.obra_id === obraId && foto.capa)?.url
}

function ListaObras() {
  const obrasAtivas = obras.filter((obra) => obra.ativa)

  function handleLogout() {
    alert('sair (ainda nao implementado)')
  }

  function handleNovaObra() {
    alert('cadastrar nova obra (ainda nao implementado)')
  }

  function handleEditar(obraId) {
    alert(`editar obra ${obraId} (ainda nao implementado)`)
  }

  function handleInteresses(obraId) {
    alert(`interesses da obra ${obraId} (ainda nao implementado)`)
  }

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Painel da Galeria" onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto w-full px-5 py-8 flex-1">
        <button
          onClick={handleNovaObra}
          className="w-full bg-lm-red text-white font-sans font-semibold py-5 text-lg hover:bg-lm-red-dark transition-colors flex items-center justify-center gap-3 mb-8"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Cadastrar Nova Obra
        </button>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {STATUS.map((status) => {
            const quantidade = obrasAtivas.filter((obra) => obra.status === status.chave).length

            return (
              <div key={status.chave} className="bg-white border border-lm-border px-2 py-4 text-center">
                <p className="font-sans font-bold text-2xl text-lm-charcoal">{quantidade}</p>
                <p className="font-sans text-xs uppercase tracking-wide text-lm-warm-gray mt-1">{status.label}</p>
              </div>
            )
          })}
        </div>

        <h2 className="font-sans font-semibold text-lm-charcoal text-base mb-4">
          Obras em exibição ({obrasAtivas.length})
        </h2>

        <div className="space-y-3">
          {obrasAtivas.map((obra) => {
            const nInteresses = interesses.filter((interesse) => interesse.obra_id === obra.id).length

            return (
            <div key={obra.id} className="bg-white border border-lm-border p-4 flex gap-4 items-start">
              <img
                src={fotoCapa(obra.id)}
                alt={obra.artista}
                className="w-16 h-20 object-cover bg-lm-image-bg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-sans font-semibold text-lm-charcoal text-base">{obra.artista}</p>
                    {obra.titulo && (
                      <p className="font-sans text-sm text-lm-warm-gray italic">{obra.titulo}</p>
                    )}
                    <p className="font-sans text-xs text-lm-muted mt-0.5">
                      {obra.tecnica} · {obra.ano}
                    </p>
                  </div>
                  <StatusBadge status={obra.status} />
                </div>

                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <select
                    defaultValue={obra.status}
                    className="border border-lm-border text-xs text-lm-charcoal px-2 py-1.5 bg-lm-ivory focus:outline-none"
                  >
                    {STATUS.map((status) => (
                      <option key={status.chave} value={status.chave}>
                        {status.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleEditar(obra.id)}
                    className="text-xs font-sans text-lm-warm-gray hover:text-lm-charcoal border border-lm-border px-3 py-1.5 transition-colors"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleInteresses(obra.id)}
                    className={`text-xs font-sans px-3 py-1.5 border transition-colors ${
                      nInteresses > 0
                        ? 'text-lm-red border-lm-red-light-border bg-lm-red-light hover:bg-lm-red-light-hover'
                        : 'text-lm-muted border-lm-border'
                    }`}
                  >
                    {nInteresses > 0
                      ? `${nInteresses} interesse${nInteresses > 1 ? 's' : ''}`
                      : 'Sem interesses'}
                  </button>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default ListaObras
