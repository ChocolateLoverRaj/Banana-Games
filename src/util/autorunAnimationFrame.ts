import { autorun, IAutorunOptions } from 'mobx'

export type Fn = () => void
export type Stop = () => void

/**
 * Like mobx `autorun`, but function is called in `requestAnimationFrame` instead of being called
 * synchronously.
 */
export const autorunAnimationFrame = (fn: Fn, opts?: IAutorunOptions): Stop => {
  let animationFrameHandle: number
  const stop = autorun(fn, {
    ...opts,
    scheduler: fn => {
      animationFrameHandle = requestAnimationFrame(fn)
    }
  })
  return () => {
    cancelAnimationFrame(animationFrameHandle)
    stop()
  }
}
