import AdminHeader from '../../components/layout/AdminHeader'

function ListaObras() {
  function handleLogout() {
    alert('sair (ainda nao implementado)')
  }

  function handleNovaObra() {
    alert('cadastrar nova obra (ainda nao implementado)')
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
      </main>
    </div>
  )
}

export default ListaObras
