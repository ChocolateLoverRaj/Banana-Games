
class KeysPressed {
  readonly _keysPressed = new Set<string>()
  private readonly handleKeyDown = ({ code }: KeyboardEvent): void => {
    this.onKeyDown(code)
  }

  private readonly handleKeyUp = ({ code }: KeyboardEvent): void => {
    this.onKeyUp(code)
  }

  onKeyDown (code: string): void {
    this._keysPressed.add(code)
  }

  onKeyUp (code: string): void {
    this._keysPressed.delete(code)
  }

  start (): void {
    addEventListener('keydown', this.handleKeyDown)
    addEventListener('keyup', this.handleKeyUp)
  }

  stop (): void {
    removeEventListener('keydown', this.handleKeyDown)
    removeEventListener('keyup', this.handleKeyUp)
    this._keysPressed.clear()
  }

  get keysPressed (): ReadonlySet<string> {
    return this._keysPressed
  }
}

export default KeysPressed
