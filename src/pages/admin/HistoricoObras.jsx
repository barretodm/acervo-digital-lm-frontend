import AdminHeader from '../../components/layout/AdminHeader'

function HistoricoObras() {
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
      </main>
    </div>
  )
}

export default HistoricoObras
