import { FC, useEffect, useLayoutEffect } from 'react'
import { Form, Switch, Typography, Spin, FormProps } from 'antd'
import ErrorResult from './ErrorResult'
import Helmet from 'react-helmet'
import config from './config.json'
import { useMapState } from 'rooks'
import { NamePath } from 'rc-field-form/lib/interface'
import ThemeChooser from './ThemeChooser'
import settingsDexie from './settingsDexie'
import { Table } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import PrimaryColorChooser from './PrimaryColorChooser'

const SettingsRoute: FC = () => {
  const savePromises = useMapState(new Map<string, Promise<void>>())
  const [form] = Form.useForm()
  const saveErrors = useMapState(new Map<string, Error>())
  const handleChange: FormProps['onFieldsChange'] = ([{ name, value }]) => {
    const key = (name as NamePath)[0]
    savePromises.set(key, (async () => {
      await (settingsDexie[key] as Table).put(value, '')
    })())
  }
  useEffect(() => {
    [...savePromises].forEach(([key, savePromise]) => {
      savePromise.then(() => savePromises.delete(key), e => saveErrors.set(key, e))
    })
  }, [savePromises])
  const settings = useLiveQuery(async () =>
    Object.fromEntries(await Promise.all([
      'pausedWhenNotVisible',
      'warnBeforeLeavingGame',
      'touchScreen'].map(async key => [
      key,
      await (settingsDexie[key] as Table).get('')
    ]))))
  useLayoutEffect(() => {
    form.setFieldsValue(settings)
  }, [settings])

  return (
    <>
      <Helmet>
        <title>Settings {'\u2022'} {config.appName}</title>
      </Helmet>
      <div>
        <Typography.Title>Settings</Typography.Title>
        <Spin tip='Loading settings' spinning={settings === undefined}>
          {saveErrors.size === 0
            ? (
              // TODO: Show unsaved / unchanged fields
              <Form
                onFieldsChange={handleChange}
                form={form}
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
                <section id='touchScreen' />
                <Form.Item
                  name='touchScreen'
                  label='Touch Screen (if device supports touch screen)'
                  valuePropName='checked'
                >
                  <Switch loading={savePromises.has('touchScreen')} />
                </Form.Item>
              </Form>)
            : <ErrorResult title='Error saving settings' error={new Error('not implemented')} />}
        </Spin>
        <ThemeChooser /><br />
        <PrimaryColorChooser />
      </div>
    </>
  )
}

export default SettingsRoute
