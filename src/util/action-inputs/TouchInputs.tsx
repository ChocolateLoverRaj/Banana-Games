import { FC, useState } from 'react'
import TouchButtons from './TouchButtons'
import useCurrentInputs from './useCurrentInputs'
import { Map, Set } from 'immutable'
import TouchInput from './TouchInput'

export interface TouchInputsProps<Action extends string = string> {
  touchButtons: TouchButtons<Action>
}

const TouchInputs: FC<TouchInputsProps> = <Action extends string = string>(
  props: TouchInputsProps<Action>
) => {
  const { touchButtons } = props

  const [currentInputs] = useCurrentInputs(touchButtons.actionInputs)
  const [buttonsPressed, setButtonsPressed] = useState(Map<Action, Set<number>>(
    [...currentInputs.keys()].map(action => [action, Set()])))

  return (
    <>
      {[...currentInputs].flatMap(
        ([action, { touch: { buttonContents, buttons } }]) => [...buttons].map(
          (absolutePosition, index) => {
            const { x, y } = absolutePosition

            const handlePress = (): void => {
              const newButtonsPressed = buttonsPressed.get(action)?.add(index) as Set<number>
              setButtonsPressed(buttonsPressed.set(action, newButtonsPressed))
              if (newButtonsPressed.size > 0) {
                touchButtons.buttonsPressed = touchButtons.buttonsPressed.add(action)
              }
            }

            const handleRelease = (): void => {
              const newButtonsPressed = buttonsPressed.get(action)?.delete(index) as Set<number>
              setButtonsPressed(buttonsPressed.set(action, newButtonsPressed))
              if (newButtonsPressed.size === 0) {
                touchButtons.buttonsPressed = touchButtons.buttonsPressed.delete(action)
              }
            }

            return (
              <TouchInput
                key={`${x.value} ${Number(x.reverse)} ${y.value} ${Number(y.reverse)}`}
                buttonProps={{
                  onTouchStart: handlePress,
                  onTouchEnd: handleRelease,
                  onClick: () => {
                    touchButtons.clickEmitter.emit(action)
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
