import { RefObject, useEffect, useRef, useState } from 'react'
import { Scaler, ScalerOptions } from 'scale-adjust'

export interface UseScalerOptions<
  TTarget extends Element,
  TReference extends Element
> extends Pick<
    ScalerOptions<TTarget, TReference>,
    'width' | 'height' | 'transition'
  > {
  reference?: RefObject<TReference>
}

const useScaler = <TTarget extends Element, TReference extends Element>({
  width,
  height,
  transition,
  reference,
}: UseScalerOptions<TTarget, TReference>): [
  RefObject<TTarget>,
  scaler: Scaler<TTarget, TReference> | null
] => {
  const ref = useRef<TTarget>(null)

  const [scaler, setScaler] = useState<Scaler<TTarget, TReference> | null>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const scaler = new Scaler<TTarget, TReference>({
      el: ref.current,
      width,
      height,
      transition,
      reference: reference?.current ?? undefined,
    })

    if (import.meta.env.DEV) {
      console.log('Scaler instance is created.')
    }

    setScaler(scaler)

    return () => void scaler.destroy()
  }, [height, reference, transition, width])

  return [ref, scaler]
}

export default useScaler
