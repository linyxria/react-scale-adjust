import {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'
import { Scaler } from 'scale-adjust'

import useScaler, { UseScalerOptions } from './use-scaler'

type ScaleCallback = (scale: number) => void

export interface ScalerProps<TReference extends Element>
  extends UseScalerOptions<HTMLDivElement, TReference>,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
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
  const [$el, scaler] = useScaler<HTMLDivElement, TReference>({
    width,
    height,
    transition,
    reference,
  })

  const onScaleRef = useRef<ScaleCallback>()
  useLayoutEffect(() => {
    onScaleRef.current = onScale
  })
  const scaleHandler = useCallback<ScaleCallback>((...args) => {
    onScaleRef.current?.(...args)
  }, [])

  useEffect(() => {
    if (!scaler) {
      return
    }

    scaler.listen(({ scale }) => {
      scaleHandler(scale)
    })
  }, [scaleHandler, scaler])

  useImperativeHandle(
    ref,
    () => ({
      element: $el.current,
      scaler,
    }),
    [$el, scaler]
  )

  return (
    <div {...props} ref={$el}>
      {children}
    </div>
  )
})

export default Component
