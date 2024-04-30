import { Scaler } from '../lib/main'

const App = () => {
  return (
    <div style={{ width: '60vw', height: '47vh', backgroundColor: 'darkcyan' }}>
      <Scaler
        width={1920}
        height={1080}
        onScale={(scale) => {
          console.log('scale:', scale)
        }}
        style={{ background: 'orange' }}
      >
        Hello, world!
      </Scaler>
    </div>
  )
}

export default App
