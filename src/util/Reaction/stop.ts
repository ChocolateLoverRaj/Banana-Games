import { Reaction } from '.'

const stop = ({ cleanup }: Reaction): void => cleanup?.()

export default stop
