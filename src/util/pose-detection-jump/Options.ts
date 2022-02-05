interface Options {
  /**
   * This change in position is too small to count as a jump
   */
  deadZoneJump: number
  /**
  * If the speed is within this then it's not moving
  */
  deadZoneSpeed: number
  /**
  * A jump always ends within this of where it started
  */
  maxLandingDiff: number
  /**
   * All the y positions in the last # of ms will be recorded
   */
  recordLastMs: number
  /**
   * It is impossible to jump longer than this. If someone is jumping longer than this, then that
   * means something is wrong with the detector.
   */
  maxJumpDuration: number
}

export default Options
