function Filtro({ numeroObras, tipo, setTipo, tecnica, setTecnica, tecnicas }) {
  const opcoes = [
    { label: "Todos", value: "todos" },
    { label: "Quadros", value: "Quadro" },
    { label: "Esculturas", value: "Escultura" },
  ];

  return (
    <div className="flex flex-row w-max m-auto items-center gap-4 mb-3">
      <div className="flex flex-row border-2">
        {opcoes.map(o => (
          <button
            key={o.value}
            type="button"
            onClick={() => setTipo(o.value)}
            className={`p-2 ${tipo === o.value ? "bg-[#1C1B18] text-white" : ""}`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <select value={tecnica} onChange={e => setTecnica(e.target.value)} aria-label="Técnica">
        <option value="">Todas as técnicas</option>
        {tecnicas.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <span className="text-xs">{numeroObras} obras</span>
    </div>
  )
}

export default Filtro