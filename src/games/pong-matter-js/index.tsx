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
  Events
} from 'matter-js'
import useComponentSize from '@rehooks/component-size'
import getScaledSize from '../../util/getScaledSize'
import { blue, grey as gray } from '@ant-design/colors'
import { Typography } from 'antd'
import config from '../../config.json'
import { GameWithActions, useScreen } from '../../util/game-with-actions'
import { ActionInputs, useActionsPressed } from '../../util/action-inputs'
import { Map, Set } from 'immutable'
import Input from '../../util/action-inputs/types/Input'
import defaultPauseInput from '../../defaultPauseInput'
import useConstant from 'use-constant'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import { Screen } from '../../util/game-with-actions/useScreen'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import limit from 'limit-number'
import toSigned from 'boolean-to-signed'

const aspectRatio = { width: 16, height: 9 }

type Action = 'Paddle 0 Up' | 'Paddle 0 Down' | 'Paddle 1 Up' | 'Paddle 1 Down' | 'back'
const buttonSize = 50
const buttonMargin = 10
const actionInputs = new ActionInputs(Map<Action, Input>([
  ['back', {
    ...defaultPauseInput,
    touch: {
      ...defaultPauseInput.touch,
      buttons: Set.of({
        x: {
          value: buttonMargin * 2 + buttonSize,
          reverse: true
        },
        y: {
          value: buttonMargin,
          reverse: false
        },
        width: buttonSize,
        height: buttonSize
      })
    }
  }],
  ['Paddle 0 Up', {
    keyboard: Set.of('KeyW'),
    touch: {
      buttonContents: <CaretUpOutlined />,
      buttons: Set.of({
        x: {
          value: 10,
          reverse: false
        },
        y: {
          value: 10,
          reverse: false
        },
        width: buttonSize,
        height: buttonSize
      })
    }
  }],
  ['Paddle 0 Down', {
    keyboard: Set.of('KeyS'),
    touch: {
      buttonContents: <CaretDownOutlined />,
      buttons: Set.of({
        x: {
          value: 10,
          reverse: false
        },
        y: {
          value: 10,
          reverse: true
        },
        width: buttonSize,
        height: buttonSize
      })
    }
  }],
  ['Paddle 1 Up', {
    keyboard: Set.of('ArrowUp'),
    touch: {
      buttonContents: <CaretUpOutlined />,
      buttons: Set.of({
        x: {
          value: 10,
          reverse: true
        },
        y: {
          value: 10,
          reverse: false
        },
        width: buttonSize,
        height: buttonSize
      })
    }
  }],
  ['Paddle 1 Down', {
    keyboard: Set.of('ArrowDown'),
    touch: {
      buttonContents: <CaretDownOutlined />,
      buttons: Set.of({
        x: {
          value: 10,
          reverse: true
        },
        y: {
          value: 10,
          reverse: true
        },
        width: buttonSize,
        height: buttonSize
      })
    }
  }]
]))

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
      const paddles = [leftPaddle, rightPaddle] as const

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
      }

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

MatterJsGame.description = (
  <Typography.Paragraph>
    <a href='https://en.wikipedia.org/wiki/Pong'>Pong</a> has been a video game for a long time,
    and many people make pong as a sample game. Because it is so simple, pong is the first real
    game on {config.appName}.
  </Typography.Paragraph>
)

export default MatterJsGame
