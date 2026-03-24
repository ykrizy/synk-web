import { useState, useEffect, useRef } from 'react'
import useIntersection from '@/hooks/useIntersection'

export default function AnimatedNumber({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, visible] = useIntersection()
  const started = useRef(false)

  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const startTime = performance.now()
    const endNum = parseFloat(end.toString().replace(/[^0-9.]/g, ''))

    function update(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * endNum))
      if (progress < 1) requestAnimationFrame(update)
      else setCount(endNum)
    }
    requestAnimationFrame(update)
  }, [visible, end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}
