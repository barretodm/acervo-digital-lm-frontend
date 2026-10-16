const STATUS_STYLE = {
  aberto: { label: 'Disponível', classe: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  em_conversa: { label: 'Em conversa', classe: 'bg-amber-50 text-amber-700 border-amber-200' },
  reservado: { label: 'Reservado', classe: 'bg-blue-50 text-blue-700 border-blue-200' },
  vendido: { label: 'Vendido', classe: 'bg-stone-100 text-stone-500 border-stone-200' },
}

function StatusBadge({ status }) {
  const { label, classe } = STATUS_STYLE[status]

  return (
    <span className={`inline-block border px-2.5 py-1 text-xs font-sans uppercase tracking-wide ${classe}`}>
      {label}
    </span>
  )
}

export default StatusBadge
