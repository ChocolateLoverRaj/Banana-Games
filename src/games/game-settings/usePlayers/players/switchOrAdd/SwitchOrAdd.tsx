import { ArrowLeftOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Result, Typography } from 'antd'
import { FC, useState } from 'react'
import addPlayer from '../addPlayer/addPlayer'
import PresetChooser from '../presetChooser/PresetChooser'
import SwitchPlayer from '../switchPlayer/SwitchPlayer'
import Props from './Props'

const SwitchOrAdd: FC<Props> = ({ id, name, presets, players }) => {
  enum State {
    CHOOSE,
    SWITCH,
    ADD
  }
  const [state, setState] = useState(State.CHOOSE)

  const backButton = (
    <Button
      icon={<ArrowLeftOutlined />}
      danger
      onClick={() => setState(State.CHOOSE)}
    >
      Back
    </Button>
  )
  return (
    <>
      {state === State.CHOOSE && (
        <Result
          icon={null}
          title={`New ${name} detected`}
          subTitle={
            <>
              ID: <Typography.Text code>{id}</Typography.Text><br />
            </>
      }
          extra={
            <>
              <Button
                icon={<UserAddOutlined />}
                type='primary'
                size='large'
                onClick={() => setState(State.ADD)}
              >
                Add Player
              </Button>
              <Button
                icon={<UserSwitchOutlined />}
                size='large'
                onClick={() => setState(State.SWITCH)}
              >
                Change IO
              </Button>
            </>
          }
        />)}
      {state === State.ADD && (
        <Result
          icon={<UserAddOutlined />}
          title='Choose a preset'
          subTitle={backButton}
          extra={
            <PresetChooser
              presets={presets}
              onChoose={index => addPlayer({
                playersObservableValue: players,
                newInputIndex: 0,
                presetId: index
              })}
            />
          }
        />
      )}
      {state === State.SWITCH && (
        <SwitchPlayer
          players={players}
          backButton={backButton}
          presets={presets}
        />
      )}
    </>
  )
}

export default SwitchOrAdd
