import defaultPauseInput from '../../defaultPauseInput'
import { ActionInputs } from '../../util/action-inputs'

const actionInputs = new ActionInputs<'back'>(new Map([['back', defaultPauseInput]]))

export default actionInputs
