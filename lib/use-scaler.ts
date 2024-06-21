import { useEffect, useRef, useState } from 'react'
import { Scaler, ScalerOptions } from 'scale-adjust'

import { useLatest } from './utils'

export interface UseScalerOptions<E extends HTMLElement>
  extends Pick<ScalerOptions<E>, 'width' | 'height'> {
  onScale?: (scale: number) => void
}

const useScaler = <E extends HTMLElement>({
  width,
  height,
  onScale,
}: UseScalerOptions<E>) => {
  const widthRef = useLatest(width)
  const heightRef = useLatest(height)
  const onScaleRef = useLatest(onScale)

  const ref = useRef<E>(null)
  const scalerRef = useRef<Scaler<E> | null>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const scaler = new Scaler<E>({
      el: ref.current,
      width: widthRef.current,
      height: heightRef.current,
    })
    scaler.onScale((scale) => {
      setScale(scale)
      onScaleRef.current && onScaleRef.current(scale)
    })
    scalerRef.current = scaler

    return () => {
      scaler.destroy()
    }
  }, [heightRef, onScaleRef, widthRef])

  return {
    ref,
    scaler: scalerRef.current,
    scale,
  }
}

export default useScaler
