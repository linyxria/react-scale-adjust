import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useImperativeHandle,
} from 'react'
import { Scaler } from 'scale-adjust'

import useScaler, { UseScalerOptions } from './use-scaler'

type ScaleCallback = (scale: number) => void

export interface ScalerProps<TReference extends Element>
  extends UseScalerOptions<HTMLDivElement, TReference>,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onScale?: ScaleCallback
}

export interface ScalerRef<TReference extends Element> {
  element: HTMLDivElement | null
  scaler: Scaler<HTMLDivElement, TReference> | null
}

const Component = forwardRef(function Scaler<TReference extends Element>(
  {
    width,
    height,
    transition,
    reference,
    onScale,
    children,
    ...props
  }: PropsWithChildren<ScalerProps<TReference>>,
  ref: ForwardedRef<ScalerRef<TReference>>
) {
  const { ref: targetRef, scaler } = useScaler<HTMLDivElement, TReference>({
    width,
    height,
    transition,
    reference,
    onScale,
  })

  useImperativeHandle(
    ref,
    () => ({
      element: targetRef.current,
      scaler,
    }),
    [scaler, targetRef]
  )

  return (
    <div {...props} ref={targetRef}>
      {children}
    </div>
  )
})

export default Component
