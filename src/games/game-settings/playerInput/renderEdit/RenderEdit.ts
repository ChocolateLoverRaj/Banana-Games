import { ReactNode } from 'react'
import Input from './Input'

type RenderEdit<T> = (input: Input<T>) => ReactNode

export default RenderEdit
