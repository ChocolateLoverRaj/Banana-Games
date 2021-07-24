import GameComponent from '../../types/GameComponent'
import { forwardRef, useEffect, useRef } from 'react'
import {
  Engine,
  Runner,
  Render,
  Bodies,
  Composite,
  Body,
  IChamferableBodyDefinition
} from 'matter-js'
import useComponentSize from '@rehooks/component-size'
import getScaledSize from '../../util/getScaledSize'
import { canvas, maxSize } from './index.module.scss'
import { blue, grey as gray } from '@ant-design/colors'
import { Typography } from 'antd'
import config from '../../config.json'

const MatterJsGame: GameComponent = forwardRef((_props, ref) => {
  const canvasRef = useRef(null)
  const componentSize = useComponentSize(ref as any)
  const scaledSize = getScaledSize(componentSize, { width: 16, height: 9 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas !== null) {
      const engine = Engine.create()
      engine.gravity.y = 0

      // Options
      const width = 1600
      const height = 900
      const ballRadius = 50
      const wallThickness = 100
      const ballColor = gray[0]
      const wallColor = blue.primary
      const paddleWidth = 20
      const paddleHeight = 200
      const paddleColor = ballColor

      const render = Render.create({ canvas, engine, options: { width, height, wireframes: false, background: 'white' } })

      const ball = Bodies.circle(width / 2, height / 2, ballRadius, {
        friction: 0,
        frictionAir: 0,
        restitution: 1,
        slop: 0,
        inertia: Infinity,
        render: { fillStyle: ballColor }
      })
      Body.setVelocity(ball, { x: 3, y: -20 })

      // Walls
      const wallOptions: IChamferableBodyDefinition = {
        render: { fillStyle: wallColor },
        isStatic: true
      }
      const topWall = Bodies.rectangle(width / 2, wallThickness / 2, width, wallThickness, wallOptions)
      const bottomWall = Bodies.rectangle(width / 2, height - wallThickness / 2, width, wallThickness, wallOptions)

      // Paddles
      const paddleOptions: IChamferableBodyDefinition = {
        render: { fillStyle: paddleColor },
        isStatic: true
      }
      const leftPaddle = Bodies.rectangle(paddleWidth / 2, height / 2, paddleWidth, paddleHeight, paddleOptions)
      const rightPaddle = Bodies.rectangle(width - paddleWidth / 2, height / 2, paddleWidth, paddleHeight, paddleOptions)

      // add all of the bodies to the world
      Composite.add(engine.world, [ball, topWall, bottomWall, leftPaddle, rightPaddle])

      // run the renderer
      Render.run(render)

      // create runner
      const runner = Runner.create()

      // run the engine
      Runner.run(runner, engine)
    }
  }, [])

  return (
    <div ref={ref} className={maxSize}>
      <canvas ref={canvasRef} className={canvas} style={scaledSize} />
    </div>
  )
})

MatterJsGame.description = (
  <Typography.Paragraph>
    <a href='https://en.wikipedia.org/wiki/Pong'>Pong</a> has been a video game for a long time,
    and many people make pong as a sample game. Because it is so simple, pong is the first real
    game on {config.appName}.
  </Typography.Paragraph>
)

export default MatterJsGame
