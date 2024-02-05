import { useEffect, useRef, useState } from 'react'

import { Scaler } from '../lib/main'

const App = () => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    console.log('scale: ', scale)
  }, [scale])

  return (
    <div>
      <div
        ref={parentRef}
        style={{ width: '64vw', height: '48vh', background: 'purple' }}
      >
        <Scaler
          width={1920}
          height={1080}
          transition
          reference={parentRef}
          onScale={setScale}
          style={{ background: 'orange' }}
        >
          Hello, world!
        </Scaler>
      </div>
    </div>
  )
}

export default App
