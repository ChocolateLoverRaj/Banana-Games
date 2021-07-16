import { FC, useEffect } from 'react'

export interface ErrorLoggerProps {
  error: Error
}

const ErrorLogger: FC<ErrorLoggerProps> = props => {
  const { error } = props

  useEffect(() => console.error(error), [error])

  return null
}

export default ErrorLogger
