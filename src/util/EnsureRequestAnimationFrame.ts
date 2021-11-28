class EnsureRequestAnimationFrame {
  private handle?: number

  constructor (private readonly callback: FrameRequestCallback) {}

  request (): void {
    if (this.handle === undefined) {
      this.handle = requestAnimationFrame(time => {
        this.handle = undefined
        this.callback(time)
      })
    }
  }

  cancel (): void {
    if (this.handle !== undefined) {
      cancelAnimationFrame(this.handle)
      this.handle = undefined
    }
  }
}

export default EnsureRequestAnimationFrame
