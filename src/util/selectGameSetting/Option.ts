import { Key, ReactNode } from 'react'

interface Option<T> {
  key: Key
  value?: T
  reactNode?: ReactNode
}

export default Option
