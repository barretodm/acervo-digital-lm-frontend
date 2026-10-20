function AdminField({ label, children }) {
  return (
    <div>
      <label className="block font-sans font-medium text-lm-charcoal text-sm mb-2">{label}</label>
      {children}
    </div>
  )
}

export default AdminField
