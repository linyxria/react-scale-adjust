interface Props {
  /**
   * 进度条的进度值
   */
  value?: number
  /**
   * 进度条的上限值
   * @default 100
   */
  max?: number
  /**
   * svg 元素的高宽
   * @default 120
   */
  size?: number
}

export default function Progress({ value = 0, max = 100, size = 120 }: Props) {
  const percentage = value < max ? (value * 100) / max : 100
  // 圆边框的大小
  const strokeWidth = size * 0.25
  // 圆的中心点
  const cxy = size / 2
  // 圆的半径
  const r = cxy - strokeWidth / 2
  // 圆的周长
  const perimeter = Math.PI * r * 2
  // 进度条轨道缺口的长度
  const dashGap = perimeter / 4
  // 进度条轨道的长度
  const dash = perimeter - dashGap
  // 进度条的偏移量
  const dashOffset = dashGap * 2.5
  // 进度条的长度
  const percentageDash = dash * (percentage / 100)
  const color =
    percentage < 60 ? '#22c55e' : percentage < 80 ? '#f59e0b' : '#ef4444'
  const fontSize = size * 0.13

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="5"
            floodColor="rgba(0,0,0,0.5)"
          />
        </filter>
      </defs>
      <circle
        cx={cxy}
        cy={cxy}
        r={r}
        fill="none"
        stroke="#d7e2eb"
        strokeWidth={strokeWidth}
        strokeDasharray={`${dash},${dashGap}`}
        strokeDashoffset={dashOffset}
      />
      <circle
        id="progress"
        cx={cxy}
        cy={cxy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${percentageDash},${
          dashGap + (dash - percentageDash)
        }`}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
      />
      <circle cx={cxy} cy={cxy} r={r} fill="#fff" filter="url(#drop-shadow)" />
      <text
        x={cxy}
        y={cxy}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={color}
        fontSize={fontSize}
      >
        {percentage}%
      </text>
    </svg>
  )
}
