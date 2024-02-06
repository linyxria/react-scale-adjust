import { RefObject, useEffect, useRef, useState } from 'react'
import { Scaler, ScalerOptions } from 'scale-adjust'

export interface UseScalerOptions<
  Target extends Element,
  Reference extends Element
> extends Pick<
    ScalerOptions<Target, Reference>,
    'width' | 'height' | 'transition'
  > {
  reference?: RefObject<Reference>
  onScale?: (scale: number) => void
}

const useScaler = <Target extends Element, Reference extends Element>(
  options: UseScalerOptions<Target, Reference>
) => {
  const ref = useRef<Target>(null)
  const scalerRef = useRef<Scaler<Target, Reference> | null>(null)
  const optionsRef = useRef(options)

  const [scale, setScale] = useState(1)

  useEffect(() => {
    const { width, height, transition, reference, onScale } = optionsRef.current
    const scaler = new Scaler<Target, Reference>({
      el: ref.current,
      width,
      height,
      transition,
      reference: reference?.current ?? undefined,
    })

    scaler.listen(({ scale }) => {
      setScale(scale)
      onScale?.(scale)
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
