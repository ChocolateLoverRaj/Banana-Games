import { FC, useRef, useEffect } from 'react'
import never from 'never'
import { blue } from '@ant-design/colors'
import MousePositionTracker from '../../util/MousePositionTracker'
import EnsureRequestAnimationFrame from '../../util/EnsureRequestAnimationFrame'
import getAngle from './getAngle'
import { observable, autorun, runInAction } from 'mobx'
import { useLocalObservable } from 'mobx-react-lite'

const turretSize = 1 / 8
const gunSize = 0.8
const gunThickness = 1 / 30

export interface CanvasProps {
  size: number
  playing: boolean
}
const Canvas: FC<CanvasProps> = ({ size, playing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sizeBoxed = useLocalObservable(() => observable.box(size))
  const playingBoxed = useLocalObservable(() => observable.box(playing))
  runInAction(() => {
    sizeBoxed.set(size)
    playingBoxed.set(playing)
  })

  useEffect(() => {
    const canvas = canvasRef.current ?? never()
    const mouseTracker = new MousePositionTracker(canvas)

    const ensureRaf = new EnsureRequestAnimationFrame(() => {
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

      const angle = mouseTracker.e !== undefined
        ? getAngle(mouseTracker.e, canvas, size)
        : 0

      // Draw gun
      ctx.strokeStyle = blue.primary ?? never()
      ctx.lineWidth = size * gunThickness
      ctx.beginPath()
      ctx.moveTo(size / 2, size / 2)
      const r = size / 2 * gunSize
      ctx.lineTo(size / 2 + Math.cos(angle) * r, size / 2 + Math.sin(angle) * r)
      ctx.closePath()
      ctx.stroke()
    })

    mouseTracker.add(() => ensureRaf.request())
    const stop = autorun(() => {
      sizeBoxed.get()
      if (playingBoxed.get()) {
        mouseTracker.start()
        ensureRaf.request()
      } else {
        mouseTracker.stop()
        ensureRaf.cancel()
      }
    })

    return () => {
      ensureRaf.cancel()
      mouseTracker.stop()
      stop()
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
