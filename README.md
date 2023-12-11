# react-scale-adjust

scale-adjust 的 React 封装

## 安装

```shell
pnpm add react-scale-adjust
```

## 使用

```tsx
import { Scaler } from 'react-scale-adjust'

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
        reference={parentRef}
        style={{ background: 'orange' }}
        onScale={(scale) => { console.log('scale:', scale) }}
      >
        Hello world!
      <Scaler>
    </div>
  )
}

export default App
```
