import reactObserver from 'observables/lib/reactObserver/reactObserver'
import Props from './Props'
import { Spin, Tag, message } from 'antd'
import getTypeSpecific from '../usePlayers/getTypeSpecific'
import Observable from 'observables/lib/Observable'
import PlayerIoType from '../PlayerIoType'
import Listenable from '../../../listenable/Listenable'
import useListenable from '../../../listenable/useListenable/useListenable'

const Player = reactObserver<Props>((observe, { players, index, useGameSettingsOutput }) => {
  console.log('render player', index)

  const observable = observe(getTypeSpecific<Observable<boolean>>(
    players,
    index,
    0,
    useGameSettingsOutput,
    PlayerIoType.BOOLEAN
  ))
  const listenable = observe(getTypeSpecific<Listenable<readonly []>>(
    players,
    index,
    1,
    useGameSettingsOutput,
    PlayerIoType.ACTION
  ))

  const [messageInstance, contextHolder] = message.useMessage()
  useListenable({
    listenable,
    listener: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageInstance.info(`Player ${index} did the action`)
    }
  })

  return (
    <>
      {contextHolder}
      <Spin spinning={observable === undefined}>
        <Tag.CheckableTag
          checked={observable !== undefined && observe(observable)}
        >
          Player {index} Boolean Input Pressed
        </Tag.CheckableTag>
      </Spin>
    </>
  )
})

export default Player
