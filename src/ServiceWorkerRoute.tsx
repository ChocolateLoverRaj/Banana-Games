import * as React from 'react'
import { FC, useContext } from 'react'
import GlobalStateContext from './GlobalStateContext'
import ServiceWorkerNotSupported from './ServiceWorkerNotSupported'
import serviceWorkerSupported from './util/serviceWorkerSupported'
import { Result, Button, Popconfirm } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import ErrorResult from './ErrorResult'
import { Link } from 'react-router-dom'
import config from './config.json'
import Helmet from 'react-helmet'

const serviceWorkerRoute: FC = () => {
  const [,
    error,
    state,
    retry,
    waiting,
    checkForUpdates,
    checkForUpdatesError,
    checkForUpdatesState,
    resetCheckForUpdates,
    update,
    active
  ] = useContext(GlobalStateContext).serviceWorker

  return (
    <>
      <Helmet>
        <title>Service Worker {'\u2022'} {config.appName}</title>
      </Helmet>
      {serviceWorkerSupported
        ? active !== undefined
          ? waiting !== undefined
            ? (
              <Result
                status='info'
                title='New Service Worker Ready'
                extra={
                  <Popconfirm
                    title='Updating the service worker will require a reload'
                    onConfirm={update}
                  >
                    <Button type='primary'>Update Now</Button>
                  </Popconfirm>
                }
              />)
            : checkForUpdatesError === undefined
              ? (
                <Result
                  status='success'
                  title='Registered Service Worker'
                  subTitle={
                    <>
                      Main website components are are available offline. Go to {' '}
                      <Link to=''>all games</Link> to download games.
                    </>
                  }
                  extra={
                    <Button
                      onClick={checkForUpdates}
                      loading={checkForUpdatesState === 'pending'}
                    >
                      Check for updates
                    </Button>
                  }
                />)
              : (
                <ErrorResult
                  error={checkForUpdatesError}
                  title='Error Checking For Updates'
                  retry={checkForUpdates}
                  cancel={resetCheckForUpdates}
                />)
          : state !== 'rejected'
            ? <Result icon={<LoadingOutlined />} title='Registering Service Worker' />
            : (
              <ErrorResult
                error={error ?? new window.Error('hi')}
                title='Error Registering Service Worker'
                retry={retry}
              />)
        : <ServiceWorkerNotSupported />}
    </>
  )
}

export default serviceWorkerRoute
