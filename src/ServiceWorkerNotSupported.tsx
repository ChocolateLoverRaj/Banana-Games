import * as React from 'react'
import { FC } from 'react'
import { Result } from 'antd'

const ServiceWorkerNotSupported: FC = () => (
  <Result
    status='warning'
    title='Service Worker Not Supported'
    subTitle='Your browser does not support Service Workers'
  />
)

export default ServiceWorkerNotSupported
