export default function FeatureCard({ icon, title, desc, tools, badgeClass = 'badge-indigo', delay = 0 }) {
  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-base font-bold mb-2" style={{ color: '#f1f5f9' }}>{title}</h3>
      <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#94a3b8' }}>{desc}</p>
      {tools && (
        <div className="flex flex-wrap gap-1.5">
          {tools.map((tool, i) => (
            <span key={i} className={`badge ${badgeClass}`}>{tool}</span>
          ))}
        </div>
      )}
    </div>
  )
}
