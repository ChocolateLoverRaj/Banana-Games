import GameComponent from '../../types/GameComponent'
import { forwardRef, useEffect, useState, useRef } from 'react'
import {
  Engine,
  Runner,
  Render,
  Bodies,
  Composite,
  Body,
  IChamferableBodyDefinition,
  Events,
  Vector
} from 'matter-js'
import useComponentSize from '@rehooks/component-size'
import getScaledSize from '../../util/getScaledSize'
import { blue, grey as gray } from '@ant-design/colors'
import { GameWithActions, useScreen } from '../../util/game-with-actions'
import { useActionsPressed } from '../../util/action-inputs'
import useConstant from 'use-constant'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import { Screen } from '../../util/game-with-actions/useScreen'
import limit from 'limit-number'
import toSigned from 'boolean-to-signed'
import never from 'never'
import random from 'rn-randomnumber'
import randomBoolean from 'random-boolean'
import getBackgroundColor from '../../getBackgroundColor'
import actionInputs from './actionInputs'
import Description from './Description'

const aspectRatio = { width: 16, height: 9 }

const MatterJsGame: GameComponent = forwardRef((_props, ref) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const componentSize = useComponentSize(ref as any)
  const useScreenResult = useScreen()
  const scaledSize = getScaledSize(componentSize, aspectRatio)
  const touchButtons = useConstant(() => new TouchButtons(actionInputs))
  const [screen] = useScreenResult
  const [runnerEngine, setRunnerEngine] = useState<[Runner, Engine]>()
  const actionsPressedState = useActionsPressed(actionInputs, touchButtons)
  const actionsPressed = useRef(actionsPressedState)

  actionsPressed.current = actionsPressedState

  // Update engine
  useEffect(() => {
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
      /**
       * In units per millisecond
       */
      const paddleSpeed = 0.5
      const scoreFontSize = 100
      const scoreFont = 'Trebuchet MS'
      const scoreMargin = 10
      const scoreColor = 'white'
      /**
       * 0 < n <= π / 2
       */
      const maxStartAngle = Math.PI / 4
      const startingVelocity = 15

      const getStartingVelocity = (): Vector => {
        // Yes, we do this here
        const angle = random(-maxStartAngle, maxStartAngle) as number
        return {
          x: Math.cos(angle) * startingVelocity * toSigned(randomBoolean()),
          y: Math.sin(angle) * startingVelocity
        }
      }

      const scores = [0, 0] as [number, number]

      const render = Render.create({ canvas, engine, options: { width, height, wireframes: false, background: getBackgroundColor() } })

      const ball = Bodies.circle(width / 2, height / 2, ballRadius, {
        friction: 0,
        frictionAir: 0,
        restitution: 1,
        slop: 0,
        inertia: Infinity,
        render: { fillStyle: ballColor }
      })

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
      const startingPaddleY = height / 2
      const leftPaddle = Bodies.rectangle(paddleWidth / 2, startingPaddleY, paddleWidth, paddleHeight, paddleOptions)
      const rightPaddle = Bodies.rectangle(width - paddleWidth / 2, startingPaddleY, paddleWidth, paddleHeight, paddleOptions)
      const paddles = [leftPaddle, rightPaddle] as const

      const reset = (): void => {
        Body.setPosition(ball, { x: width / 2, y: height / 2 })
        Body.setVelocity(ball, getStartingVelocity())
        for (const paddle of paddles) Body.setPosition(paddle, { x: paddle.position.x, y: startingPaddleY })
      }
      reset()

      // add all of the bodies to the world
      Composite.add(engine.world, [ball, topWall, bottomWall, leftPaddle, rightPaddle])

      // run the renderer
      Render.run(render)

      // create runner
      const runner = Runner.create()

      setRunnerEngine([runner, engine])

      const minPaddleX = wallThickness + paddleHeight / 2
      const maxPaddleX = height - minPaddleX
      const handleTick = ({ source: { delta } }: any): void => {
        for (const i of [0, 1] as const) {
          const up = actionsPressed.current.has(`Paddle ${i} Up`)
          const down = actionsPressed.current.has(`Paddle ${i} Down`)
          if (up || down) {
            Body.setPosition(paddles[i], {
              x: paddles[i].position.x,
              y: limit(
                minPaddleX,
                maxPaddleX,
                paddles[i].position.y + paddleSpeed * delta * toSigned(down)
              )
            })
          }
        }

        // Scoring
        if (ball.position.x > width) {
          reset()
          scores[0]++
        } else if (ball.position.x < 0) {
          reset()
          scores[1]++
        }
      }

      Events.on(render, 'afterRender', e => {
        const ctx = canvas.getContext('2d') ?? never('No 2d context')
        ctx.textBaseline = 'top'
        ctx.font = `${scoreFontSize}px ${scoreFont}`
        ctx.fillStyle = scoreColor
        ctx.textAlign = 'center'
        ctx.fillText(scores[0].toString(), width / 4, scoreMargin, width / 2)
        ctx.fillText(scores[1].toString(), width * 3 / 4, scoreMargin, width / 2)
      })

      Events.on(runner, 'tick', handleTick)
      return () => Events.off(runner, 'tick', handleTick)
    }
  }, [canvas])

  // Start / stop runner
  useEffect(() => {
    if (runnerEngine !== undefined) {
      const [runner, engine] = runnerEngine
      // run the engine
      Runner.run(runner, engine)

      return () => Runner.stop(runner)
    }
  }, [runnerEngine])

  // Pause game
  useEffect(() => {
    if (runnerEngine !== undefined) {
      const [runner] = runnerEngine
      runner.enabled = screen === Screen.PLAYING
    }
  }, [runnerEngine, screen])

  return (
    <GameWithActions
      loadedGameConfig={{ useScreenResult, inputs: { actionInputs, touchButtons, back: 'back' } }}
      {...{ aspectRatio, ref }}
    >
      <canvas ref={setCanvas} style={scaledSize} />
    </GameWithActions>
  )
})

MatterJsGame.description = <Description />

export default MatterJsGame
