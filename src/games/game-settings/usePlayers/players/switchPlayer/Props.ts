import { ReactNode } from 'react'
import Output from '../../Output'
import PresetOption from '../PresetOption'

interface Props {
  players: Output
  backButton: ReactNode
  presets: readonly PresetOption[] | undefined
}

export default Props
