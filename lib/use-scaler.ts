import { useEffect, useRef, useState } from 'react'
import { Scaler, ScalerOptions } from 'scale-adjust'

export interface UseScalerOptions<E extends HTMLElement>
  extends Pick<ScalerOptions<E>, 'width' | 'height'> {
  onScale?: (scale: number) => void
}

const useScaler = <E extends HTMLElement>({
  width,
  height,
  onScale,
}: UseScalerOptions<E>) => {
  const ref = useRef<E>(null)
  const scalerRef = useRef<Scaler<E> | null>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const scaler = new Scaler<E>({
      el: ref.current,
      width,
      height,
    })
    scaler.onScale((scale) => {
      setScale(scale)
      onScale && onScale(scale)
    })
    scalerRef.current = scaler
    return () => void scaler.destroy()
  }, [])

  return {
    ref,
    scaler: scalerRef.current,
    scale,
  }
}

export default useScaler
