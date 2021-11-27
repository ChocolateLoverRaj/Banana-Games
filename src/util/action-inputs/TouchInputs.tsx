import { FC } from 'react'
import TouchButtons from './TouchButtons'
import TouchInput from './TouchInput'
import { useLocalObservable } from 'mobx-react-lite'
import { action } from 'mobx'

export interface TouchInputsProps<Action extends string = string> {
  touchButtons: TouchButtons<Action>
}

const TouchInputs: FC<TouchInputsProps> = <Action extends string = string>(
  props: TouchInputsProps<Action>
) => {
  const { touchButtons } = props
  const { actionInputs } = touchButtons

  const buttonsPressed = useLocalObservable(() => new Map<Action, Set<number>>(
    [...actionInputs.currentInputs.keys()].map(action => [action, new Set()])))

  return (
    <>
      {[...actionInputs.currentInputs].flatMap(
        ([actionKey, { touch: { buttonContents, buttons } }]) => [...buttons].map(
          (absolutePosition, index) => {
            const { x, y } = absolutePosition

            const handlePress = action((): void => {
              const newButtonsPressed = buttonsPressed.get(actionKey)?.add(index) as Set<number>
              buttonsPressed.set(actionKey, newButtonsPressed)
              if (newButtonsPressed.size > 0) {
                touchButtons.buttonsPressed = touchButtons.buttonsPressed.add(actionKey)
              }
            })

            const handleRelease = (): void => {
              const actionButtonsPressed = buttonsPressed.get(actionKey) as Set<number>
              actionButtonsPressed.delete(index)
              if (actionButtonsPressed.size === 0) {
                touchButtons.buttonsPressed.delete(actionKey)
              }
            }

            return (
              <TouchInput
                key={`${x.value} ${Number(x.reverse)} ${y.value} ${Number(y.reverse)}`}
                buttonProps={{
                  onTouchStart: handlePress,
                  onTouchEnd: handleRelease,
                  onClick: () => {
                    touchButtons.clickEmitter.emit(actionKey)
                  }
                }}
                absolutePosition={absolutePosition}
              >
                {buttonContents}
              </TouchInput>
            )
          }))}
    </>
  )
}

export default TouchInputs
