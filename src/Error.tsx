import { Result, Button } from 'antd'
import * as React from 'react'
import { FC, useEffect } from 'react'

export type Retry = () => void
export type Cancel = () => void

export interface ErrorProps {
  error: Error
  title?: string
  retry?: Retry
  cancel?: Cancel
}

const Error: FC<ErrorProps> = props => {
  const { error, title, retry, cancel } = props

  useEffect(() => console.error(error), [error])

  return (
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
  )
}

export default Error
