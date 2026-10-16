import AdminHeader from '../../components/layout/AdminHeader'

function InteressesObra() {
  function handleBack() {
    alert('voltar (ainda nao implementado)')
  }

  function handleLogout() {
    alert('sair (ainda nao implementado)')
  }

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Interesses Recebidos" onBack={handleBack} onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto w-full px-5 py-8 flex-1"></main>
    </div>
  )
}

export default InteressesObra
