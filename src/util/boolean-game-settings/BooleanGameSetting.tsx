import AbsolutePosition from '../types/AbsolutePosition'
import { GameSetting } from '../game-setting'
import Size from '../types/Size'
import clone from 'rfdc/default'
import { ReactNode, HTMLProps } from 'react'
import { GameSettings } from '../game-with-settings/useGameSettings'
import TouchButton from './TouchButton'
import { detectTouch } from 'detect-touch'
import { makeObservable, observable, action } from 'mobx'
import KeyBindings from './KeyBindings'
import setSet from '../setSet'
import { CSSInterpolation } from '@emotion/css'

class BooleanGameSetting extends GameSetting {
  keyBindings = new Set<string>()
  screenRects: Array<AbsolutePosition & Size>
  isTouchButtonPressed = false

  constructor (
    public displayName: string,
    public readonly defaultKeyBindings: Set<string>,
    public readonly buttonContent: ReactNode,
    public readonly defaultButtons: Array<AbsolutePosition & Size>
  ) {
    super()
    this.resetToDefault()
    makeObservable(this, {
      keyBindings: observable,
      screenRects: observable,
      isTouchButtonPressed: observable,
      resetToDefault: action
    })
  }

  renderPlaying (gameSettings: GameSettings): ReactNode {
    return detectTouch() && gameSettings.touchScreen && this.screenRects.map(absolutePosition => {
      const { x, y, width, height } = absolutePosition

      return (
        <TouchButton
          key={`${x.value} ${x.reverse.toString()} ${y.value} ${y.reverse.toString()} ${width} ${height}`}
          {...{ absolutePosition }}
          buttonProps={{
            onTouchStart: action(() => {
              this.isTouchButtonPressed = true
            }),
            onTouchEnd: action(() => {
              this.isTouchButtonPressed = false
            })
          }}
        >
          {this.buttonContent}
        </TouchButton>
      )
    })
  }

  get isSameAsDefault (): boolean {
    return [...this.keyBindings].join() === [...this.defaultKeyBindings].join()
  }

  resetToDefault (): void {
    setSet(this.keyBindings, this.defaultKeyBindings)
    this.screenRects = clone(this.defaultButtons)
  }

  renderEdit (): ReactNode {
    return <KeyBindings keyboard={this.keyBindings} />
  }

  renderScreenRect (
    screenRect: AbsolutePosition & Size,
    isPlaying: boolean,
    htmlProps?: HTMLProps<HTMLElement>,
    style?: CSSInterpolation
  ): ReactNode {
    return (
      <TouchButton
        absolutePosition={screenRect}
        buttonProps={{
          ...htmlProps as any,
          ...isPlaying
            ? {
                onTouchStart: action(() => {
                  this.isTouchButtonPressed = true
                }),
                onTouchEnd: action(() => {
                  this.isTouchButtonPressed = false
                })
              }
            : undefined
        }}
        {...{ style }}
      >
        {this.buttonContent}
      </TouchButton>
    )
  }
}

export default BooleanGameSetting
