import { useState } from 'react'
import AdminHeader from '../../components/layout/AdminHeader'
import StatusBadge from '../../components/common/StatusBadge'
import { obras as obrasIniciais } from '../../mocks/obras'
import { interesses } from '../../mocks/interesses'
import { STATUS, STATUS_RESUMO } from '../../constants/status'
import { fotoCapa } from '../../utils/obras'

function ListaObras() {
  const [obras, setObras] = useState(obrasIniciais)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(null)
  const [filtroStatus, setFiltroStatus] = useState(null)

  const obrasAtivas = obras.filter((obra) => obra.ativa)
  const obrasFiltradas = filtroStatus
    ? obrasAtivas.filter((obra) => obra.status === filtroStatus)
    : obrasAtivas

  function toggleFiltro(status) {
    setFiltroStatus((atual) => (atual === status ? null : status))
  }

  function handleExcluir(obraId) {
    setObras((lista) => lista.filter((obra) => obra.id !== obraId))
    setConfirmandoExclusao(null)
  }

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

  function handleHistorico() {
    alert('historico de obras (ainda nao implementado)')
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

        <p className="text-xs text-lm-muted font-sans mb-2">Toque em um cartão para filtrar por status:</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {STATUS_RESUMO.map((status) => {
            const quantidade = obrasAtivas.filter((obra) => obra.status === status.chave).length
            const ativo = filtroStatus === status.chave

            return (
              <button
                key={status.chave}
                onClick={() => toggleFiltro(status.chave)}
                className={`px-2 py-4 text-center border-2 transition-colors ${
                  ativo
                    ? 'border-lm-charcoal bg-lm-charcoal text-white'
                    : 'border-lm-border bg-white hover:border-lm-charcoal text-lm-charcoal'
                }`}
              >
                <p className="font-sans font-bold text-2xl">{quantidade}</p>
                <p className={`font-sans text-xs uppercase tracking-wide mt-1 ${ativo ? 'text-white/80' : 'text-lm-warm-gray'}`}>
                  {status.label}
                </p>
              </button>
            )
          })}
        </div>

        {filtroStatus && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-sans text-lm-warm-gray">
              Mostrando apenas:{' '}
              <span className="font-semibold text-lm-charcoal">
                {STATUS.find((status) => status.chave === filtroStatus).label}
              </span>
            </p>
            <button
              onClick={() => setFiltroStatus(null)}
              className="text-xs font-sans text-lm-warm-gray hover:text-lm-charcoal underline transition-colors"
            >
              Ver todas
            </button>
          </div>
        )}

        <h2 className="font-sans font-semibold text-lm-charcoal text-base mb-4">
          {filtroStatus
            ? `${obrasFiltradas.length} obra${obrasFiltradas.length !== 1 ? 's' : ''} — ${STATUS.find((status) => status.chave === filtroStatus).label}`
            : `Obras em exibição (${obrasAtivas.length})`}
        </h2>

        <div className="space-y-3">
          {obrasFiltradas.length === 0 && (
            <div className="bg-white border border-lm-border p-8 text-center text-lm-muted font-sans text-sm">
              Nenhuma obra com este status.
            </div>
          )}
          {obrasFiltradas.map((obra) => {
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

                  {confirmandoExclusao === obra.id ? (
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="text-xs text-lm-warm-gray font-sans">Confirmar exclusão?</span>
                      <button
                        onClick={() => handleExcluir(obra.id)}
                        className="text-xs font-sans text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 transition-colors"
                      >
                        Sim, excluir
                      </button>
                      <button
                        onClick={() => setConfirmandoExclusao(null)}
                        className="text-xs font-sans text-lm-warm-gray border border-lm-border px-3 py-1.5 hover:text-lm-charcoal transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmandoExclusao(obra.id)}
                      className="text-xs font-sans text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 transition-colors ml-auto"
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            </div>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-lm-border-admin">
          <button
            onClick={handleHistorico}
            className="flex items-center gap-2 text-sm text-lm-warm-gray hover:text-lm-charcoal transition-colors font-sans"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            Ver histórico de obras removidas ({obras.filter((obra) => !obra.ativa).length})
          </button>
        </div>
      </main>
    </div>
  )
}

export default ListaObras
