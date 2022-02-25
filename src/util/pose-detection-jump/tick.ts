import Data from './Data'
import { Pose } from '@tensorflow-models/pose-detection'
import getLowestPointY from '../getLowestPointY'
import never from 'never'

const tick = ({
  data,
  options: { deadZoneJump, deadZoneSpeed, maxLandingDiff, recordLastMs, maxJumpDuration }
}: Data, pose: Pose | undefined): void => {
  if (pose !== undefined) {
    const yNow = getLowestPointY(pose.keypoints)
    const timeNow = Date.now()

    const previousYs = data.recordedYs.map(({ value }) => value)
    const greatestY = Math.max(...previousYs)
    const leastY = Math.min(...previousYs)
    const yOffset = previousYs.length > 0
      ? yNow < leastY
        ? (yNow - greatestY)
        : 0
      : 0
    const ySpeed = yOffset !== 0
      ? yOffset /
        (timeNow - (data.recordedYs.reverse()
          .find(({ value }) => value === (yOffset > 0 ? leastY : greatestY)) ?? never()).time)
      : 0

    data.distanceFromGround = data.isInAir
      ? previousYs[0] - yNow
      : 0

    // REMEMBER: +speed means moving 'down', and -speed means moving 'up'
    if (!data.isInAir && Math.abs(data.lastSpeed) < deadZoneSpeed && yOffset < -deadZoneJump) {
      data.isInAir = true
      data.recordedYs =
        [data.recordedYs.reverse().find(({ value }) => value === greatestY) ?? never()]
    } else if (
      data.isInAir && ((
        // Has stopped moving
        Math.abs(ySpeed) < deadZoneSpeed &&
        // Is close to where jumped from
        // This prevents it from touching the ground if they are actually at the highest point
        // in their jump in the dead zone speed
        Math.abs(yNow - previousYs[0]) <= maxLandingDiff
      ) || (
        timeNow - data.recordedYs[0].time > maxJumpDuration
      ))
    ) {
      data.isInAir = false
      // Reset
      data.recordedYs = []
    }

    // Reset stuff
    data.lastSpeed = ySpeed
    if (!data.isInAir) {
    // Remove recorded ys from before {magic ms} ago
      while (data.recordedYs[0]?.time < timeNow - recordLastMs) {
        data.recordedYs.shift()
      }
      data.recordedYs.push({
        time: timeNow,
        value: yNow
      })
    }
  }
}

export default tick
