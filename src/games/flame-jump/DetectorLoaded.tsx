import { useEffect, useState, useContext } from 'react'
import useComponentSize from '@rehooks/component-size'
import getScaledSize from '../../util/getScaledSize'
import { observer } from 'mobx-react-lite'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Line,
  BufferGeometry,
  Vector3,
  LineBasicMaterial,
  Frustum,
  Matrix4
} from 'three'
import { repeatedAnimationFrame } from 'repeated-animation-frame'
import DetectorLoadedProps from './DetectorLoadedProps'
import GameContext from './GameContext'
import { initialize as initializeJump } from '../../util/poseDetectionJump'
import never from 'never'
import tick from '../../util/poseDetectionJump/tick'
import { initialize as initializeThreePose, update } from './threePose'
import { SupportedModels, calculators } from '@tensorflow-models/pose-detection'
import flipKeypointsX from '../../util/flipKeypointsX'
import { autorunCleanup } from 'mobx-autorun-cleanup'
import { get } from '../../util/mobxEmitterValue'
import { ScreenEnum } from '../../util/gameWithSettings'
import { message } from 'antd'
import { initialize, estimatePoses } from './detectorWorker/estimatePoses'

const aspectRatio = { width: 16, height: 9 }

const DetectorLoaded = observer<DetectorLoadedProps>(({ detectorWorker, videoRef }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const { gameRef, screen } = useContext(GameContext)
  const componentSize = useComponentSize(gameRef)
  const scaledSize = getScaledSize(componentSize, aspectRatio)

  // Update engine
  useEffect(() => {
    if (canvas !== null) {
      const scene = new Scene()
      const camera = new PerspectiveCamera(70, aspectRatio.width / aspectRatio.height, 0.1, 1000)

      const renderer = new WebGLRenderer({ canvas })
      renderer.setSize(scaledSize.width, scaledSize.height)

      const fireGeometry = new BoxGeometry(150, 1, 2)
      const fireMaterial = new MeshBasicMaterial({ color: 'red' })
      const fire = new Mesh(fireGeometry, fireMaterial)
      fire.position.z = -400
      scene.add(fire)

      // const playerGeometry = new BoxGeometry(20, 75, 10)
      // const playerMaterial = new MeshNormalMaterial({ opacity: 0.5, transparent: true })
      // const player = new Mesh(playerGeometry, playerMaterial)
      // scene.add(player)
      const player = initializeThreePose(SupportedModels.MoveNet)
      player.object3D.scale.set(50, 50, 50)
      scene.add(player.object3D)

      const lineGeometry = new BufferGeometry().setFromPoints([
        new Vector3(-100, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(100, 0, 0)
      ])
      const lineMaterial = new LineBasicMaterial()
      const line = new Line(lineGeometry, lineMaterial)
      scene.add(line)

      camera.position.z = 125
      camera.position.y = 75

      camera.updateMatrix()
      camera.updateMatrixWorld()
      const frustum = new Frustum()
      frustum.setFromProjectionMatrix(
        new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse))

      const jump = initializeJump()

      let fireDistance = 400
      let lastTick = Date.now()
      const cleanupRaf = repeatedAnimationFrame(t => {
        // console.log(timeForward, jump.data.distanceFromGround)
        renderer.render(scene, camera)
        const timeSinceLastTick = Date.now() - lastTick
        fire.position.z = -fireDistance + timeSinceLastTick * 0.1
        player.object3D.position.y = jump.data.distanceFromGround
      })
      const video = videoRef.current ?? never()
      const poseDetector = initialize(detectorWorker, video)
      const cleanupTick = autorunCleanup(() => {
        if (get(screen.mobx)[0] === ScreenEnum.PLAYING) {
          const cleanupTick = repeatedAnimationFrame(async () => {
            console.time('estimatePoses')
            const estimatePromise = await estimatePoses(poseDetector)
            console.timeEnd('estimatePoses')
            const [pose] = await estimatePromise
            const now = Date.now()
            tick(jump, pose)
            if (pose !== undefined) {
              const normalizedKeypoints = flipKeypointsX(
                calculators.keypointsToNormalizedKeypoints(pose.keypoints, {
                  width: video.videoWidth,
                  height: video.videoHeight
                }))
              update(player, normalizedKeypoints)
            }
            const timeForward = now - lastTick
            fireDistance -= timeForward * 0.1
            if (fireDistance < 0) {
              if (jump.data.distanceFromGround === 0) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                message.error('You died')
              }
              fireDistance += 400
            }
            lastTick = now
          })
          return cleanupTick
        }
      })

      return () => {
        cleanupRaf()
        cleanupTick()
      }
    }
  }, [canvas])

  return (
    <canvas ref={setCanvas} style={scaledSize} />
  )
})

export default DetectorLoaded
