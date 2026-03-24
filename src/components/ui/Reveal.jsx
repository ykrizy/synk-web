import useIntersection from '@/hooks/useIntersection'

export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useIntersection()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
