import { Result, Button } from 'antd'
import * as React from 'react'
import { FC, ReactNode } from 'react'
import ErrorLogger from './ErrorLogger'

export type Retry = () => void
export type Cancel = () => void

export interface ErrorProps {
  error: Error
  title?: ReactNode
  retry?: Retry
  cancel?: Cancel
}

const ErrorResult: FC<ErrorProps> = props => {
  const { error, title, retry, cancel } = props

  return (
    <>
      <ErrorLogger {...{ error }} />
      <Result
        status='error'
        title={title ?? 'Error'}
        subTitle='Open console to view error'
        extra={
          <>
            {retry !== undefined && <Button type='primary' onClick={retry}>Retry</Button>}
            {cancel !== undefined && <Button onClick={cancel}>Cancel</Button>}
          </>
      }
      />
    </>
  )
}

export default ErrorResult
