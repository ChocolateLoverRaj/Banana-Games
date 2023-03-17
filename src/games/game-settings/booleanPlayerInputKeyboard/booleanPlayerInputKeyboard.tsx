import PlayerInput from '../playerInput/PlayerInput'

const booleanPlayerInputKeyboard: PlayerInput<string> = {
  renderEdit: () => {
    return (
      <>Boolean input editor</>
    )
  },
  getDefaultData: () => ''
}

export default booleanPlayerInputKeyboard
