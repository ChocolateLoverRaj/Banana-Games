import * as React from 'react'
import { FC } from 'react'

const size = 100
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet'
]
// strokeWidth * x = space
const space = 2 / 3
const holeRadius = size * 1 / 6
const strokeWidth = (size / 2 - holeRadius) / (colors.length + colors.length * space)

const Logo: FC = () => (
  <svg viewBox={`0 0 ${size} ${size}`} xmlns='http://www.w3.org/2000/svg'>
    {colors.map((color, index) => (
      <circle
        key={color}
        cx={size / 2}
        cy={size / 2}
        strokeWidth={strokeWidth}
        r={holeRadius + (index + 1) * (strokeWidth * (1 + space)) - strokeWidth / 2}
        fill='none'
        stroke={color}
      />
    ))}
  </svg>
)

export default Logo
