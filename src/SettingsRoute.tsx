import { FC, useState } from 'react'
import { Button, Form, Switch, Typography, Spin, FormProps } from 'antd'
import { useTransaction } from './util/use-indexed-db'
import settingsDb from './settingsDb'
import usePromise from 'react-use-promise'
import ErrorResult from './ErrorResult'
import Helmet from 'react-helmet'
import config from './config.json'
import storeToObject from './util/storeToObject'

const SettingsRoute: FC = () => {
  const createTransaction = useTransaction(settingsDb)
  const [settings, error] = usePromise<object>(async () => await storeToObject(
    (await createTransaction(['settings'], 'readonly')).objectStore('settings')), [])
  const [savePromise, setSavePromise] = useState<Promise<void>>(Promise.resolve())
  const [, saveError, saveState] = usePromise(savePromise, [savePromise])

  const handleFinish: FormProps['onFinish'] = settings =>
    setSavePromise(createTransaction(['settings'], 'readwrite').then(async transaction => {
      const store = transaction.objectStore('settings')
      // TODO: Only modify changed fields
      await Promise.all(Object.entries(settings).map(async ([k, v]) => await store.put?.(v, k)))
    }))

  return (
    <>
      <Helmet>
        <title>Settings {'\u2022'} {config.appName}</title>
      </Helmet>
      <div>
        <Typography.Title>Settings</Typography.Title>
        {settings !== undefined
          ? saveError === undefined
            ? (
              // TODO: Show unsaved / unchanged fields
              <Form initialValues={settings} onFinish={handleFinish}>
                <Form.Item
                  name='pausedWhenNotVisible'
                  label='Paused When Not Visible'
                  valuePropName='checked'
                >
                  <Switch />
                </Form.Item>
                <section id='warnBeforeLeavingGame' />
                <Form.Item
                  name='warnBeforeLeavingGame'
                  label='Warn Before Leaving Game'
                  valuePropName='checked'
                >
                  <Switch />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType='submit'
                    type='primary'
                    loading={saveState === 'pending'}
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
              )
            : <ErrorResult title='Error saving settings' error={saveError} />
          : error === undefined
            ? <Spin tip='Loading Settings' />
            : <ErrorResult title='Error loading settings' error={error} />}
      </div>
    </>
  )
}

export default SettingsRoute
