import { FC, useState } from 'react'
import { Button, Form, Switch, Typography, Spin, FormProps } from 'antd'
import { useTransaction } from './util/use-indexed-db'
import settingsDb from './settingsDb'
import usePromise from 'react-use-promise'
import ErrorResult from './ErrorResult'
import Helmet from 'react-helmet'
import config from './config.json'

const SettingsRoute: FC = () => {
  const createTransaction = useTransaction(settingsDb)
  const [pausedWhenNotVisible, error] = usePromise<boolean>(async () => await
  (await createTransaction(['settings'], 'readwrite')).objectStore('settings')
    .get('pausedWhenNotVisible'), [])

  const [savePromise, setSavePromise] = useState<Promise<void>>(Promise.resolve())
  const [, saveError, saveState] = usePromise(savePromise, [savePromise])

  const handleFinish: FormProps['onFinish'] = ({ pausedWhenNotVisible }) =>
    setSavePromise(createTransaction(['settings'], 'readwrite').then(async transaction => {
      await transaction.objectStore('settings').put?.(pausedWhenNotVisible, 'pausedWhenNotVisible')
    }))

  return (
    <>
      <Helmet>
        <title>Settings {'\u2022'} {config.appName}</title>
      </Helmet>
      <div>
        <Typography.Title>Settings</Typography.Title>
        {pausedWhenNotVisible !== undefined
          ? saveError === undefined
            ? (
              // TODO: Show unsaved / unchanged fields
              <Form initialValues={{ pausedWhenNotVisible }} onFinish={handleFinish}>
                <Form.Item
                  name='pausedWhenNotVisible'
                  label='Paused When Not Visible'
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
