import { FC, useRef, useEffect } from 'react'
import never from 'never'
import { blue } from '@ant-design/colors'
import { observable, runInAction } from 'mobx'
import { useLocalObservable } from 'mobx-react-lite'
import { getDataFromSetting, getAngle, start, stop } from './turret-setting/get-angle'
import turretSetting from './turretSetting'
import { Screen } from '../../util/game-with-settings'
import { repeatedAnimationFrame } from 'repeated-animation-frame'

const turretSize = 1 / 8
const gunSize = 0.8
const gunThickness = 1 / 30

export interface CanvasProps {
  size: number
  screen: Screen
}

const Canvas: FC<CanvasProps> = ({ size, screen }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sizeBoxed = useLocalObservable(() => observable.box(size))
  runInAction(() => {
    sizeBoxed.set(size)
  })

  useEffect(() => {
    const canvas = canvasRef.current ?? never()
    const mobxAngle = getDataFromSetting(turretSetting, () => {
      const { x, y } = canvas.getBoundingClientRect()
      return {
        x: x + size / 2,
        y: y + size / 2
      }
    })
    start(mobxAngle)

    // FIXME: Pause when game is paused
    const stopRaf = repeatedAnimationFrame(() => {
      const size = sizeBoxed.get()
      const ctx = (canvas).getContext('2d') ??
      never()
      ctx.fillStyle = blue.primary ?? never()

      ctx.clearRect(0, 0, size, size)
      // Draw turret
      ctx.beginPath()
      ctx.ellipse(
        size / 2, size / 2,
        size * turretSize, size * turretSize,
        0,
        0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()

      // Draw gun
      ctx.strokeStyle = blue.primary ?? never()
      ctx.lineWidth = size * gunThickness
      ctx.beginPath()
      ctx.moveTo(size / 2, size / 2)
      const r = size / 2 * gunSize
      const angle = getAngle(mobxAngle) ?? 0
      ctx.lineTo(size / 2 + Math.cos(angle) * r, size / 2 + Math.sin(angle) * r)
      ctx.closePath()
      ctx.stroke()
    })

    return () => {
      stop(mobxAngle)
      stopRaf()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
    />
  )
}

export default Canvas
