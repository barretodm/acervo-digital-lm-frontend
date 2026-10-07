import logoLM from '../../assets/images/logo-lm.png'

function AdminHeader({ title, onLogout }) {
  return (
    <header className="bg-white border-b-2 border-lm-border">
      <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logoLM} alt="LM" className="h-9 w-auto object-contain" />
          <h1 className="font-sans font-semibold text-lm-charcoal text-lg">{title}</h1>
        </div>

        <button
          onClick={onLogout}
          className="text-sm font-sans text-lm-warm-gray hover:text-red-600 transition-colors border border-lm-border hover:border-red-300 px-4 py-2"
        >
          Sair
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
