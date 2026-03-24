const variantMap = {
  indigo: 'badge-indigo',
  emerald: 'badge-emerald',
  amber: 'badge-amber',
  cyan: 'badge-cyan',
  violet: 'badge-violet',
  red: 'badge-red',
}

export default function Badge({ children, variant = 'indigo', className = '' }) {
  return (
    <span className={`badge ${variantMap[variant] || 'badge-indigo'} ${className}`}>
      {children}
    </span>
  )
}
