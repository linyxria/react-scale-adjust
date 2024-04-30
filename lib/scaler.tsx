import { forwardRef, useImperativeHandle } from 'react'
import { Scaler } from 'scale-adjust'

import useScaler, { UseScalerOptions } from './use-scaler'

export interface ScalerProps
  extends UseScalerOptions<HTMLDivElement>,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
  onScale?: (scale: number) => void
}

export interface ScalerRef {
  element: HTMLDivElement | null
  scaler: Scaler<HTMLDivElement> | null
  scale: number
}

const Component = forwardRef(function Scaler(
  { width, height, onScale, children, ...props }: ScalerProps,
  ref: React.ForwardedRef<ScalerRef>
) {
  const {
    ref: element,
    scaler,
    scale,
  } = useScaler<HTMLDivElement>({
    width,
    height,
    onScale,
  })

  useImperativeHandle(
    ref,
    () => ({
      element: element.current,
      scaler,
      scale,
    }),
    [scaler, scale]
  )

  return (
    <div ref={element} {...props}>
      {children}
    </div>
  )
})

export default Component
