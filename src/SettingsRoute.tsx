import { FC, useEffect } from 'react'
import { Form, Switch, Typography, Spin, FormProps } from 'antd'
import { useTransaction } from './util/use-indexed-db'
import settingsDb from './settingsDb'
import usePromise from 'react-use-promise'
import ErrorResult from './ErrorResult'
import Helmet from 'react-helmet'
import config from './config.json'
import storeToObject from './util/storeToObject'
import { useMapState } from 'rooks'
import { NamePath } from 'rc-field-form/lib/interface'
import ThemeChooser from './ThemeChooser'

const SettingsRoute: FC = () => {
  const createTransaction = useTransaction(settingsDb)
  const [settings, error] = usePromise<object>(async () => await storeToObject(
    (await createTransaction(['settings'], 'readonly')).objectStore('settings')), [])
  const savePromises = useMapState(new Map<string, Promise<void>>())
  const saveErrors = useMapState(new Map<string, Error>())
  const handleChange: FormProps['onFieldsChange'] = ([{ name, value }]) => {
    const key = (name as NamePath)[0]
    savePromises.set(key, (async () => {
      const transaction = await createTransaction(['settings'], 'readwrite')
      await transaction.objectStore('settings').put?.(value, key)
    })())
  }
  useEffect(() => {
    [...savePromises].forEach(([key, savePromise]) => {
      savePromise.then(() => savePromises.delete(key), e => saveErrors.set(key, e))
    })
  }, [savePromises])

  return (
    <>
      <Helmet>
        <title>Settings {'\u2022'} {config.appName}</title>
      </Helmet>
      <div>
        <Typography.Title>Settings</Typography.Title>
        {settings !== undefined
          ? saveErrors.size === 0
            ? (
              // TODO: Show unsaved / unchanged fields
              <Form
                initialValues={settings}
                onFieldsChange={handleChange}
              >
                <Form.Item
                  name='pausedWhenNotVisible'
                  label='Paused When Not Visible'
                  valuePropName='checked'
                >
                  <Switch loading={savePromises.has('pausedWhenNotVisible')} />
                </Form.Item>
                <section id='warnBeforeLeavingGame' />
                <Form.Item
                  name='warnBeforeLeavingGame'
                  label='Warn Before Leaving Game'
                  valuePropName='checked'
                >
                  <Switch loading={savePromises.has('warnBeforeLeavingGame')} />
                </Form.Item>
              </Form>
              )
            : <ErrorResult title='Error saving settings' error={new Error('not implemented')} />
          : error === undefined
            ? <Spin tip='Loading Settings' />
            : <ErrorResult title='Error loading settings' error={error} />}
        <ThemeChooser />
      </div>
    </>
  )
}

export default SettingsRoute
