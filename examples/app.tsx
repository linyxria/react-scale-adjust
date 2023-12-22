import { useRef } from 'react'

import { Scaler } from '../lib/main'

const App = () => {
  const parentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={parentRef}
      style={{ width: '64vw', height: '48vh', background: 'purple' }}
    >
      <Scaler
        width={1920}
        height={1080}
        transition
        reference={parentRef}
        onScale={(scale) => {
          console.log('scale:', scale)
        }}
        style={{ background: 'orange' }}
      >
        Hello world!
      </Scaler>
    </div>
  )
}

export default App
