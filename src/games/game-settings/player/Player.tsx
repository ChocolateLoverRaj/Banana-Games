import reactObserver from 'observables/lib/reactObserver/reactObserver'
import Props from './Props'
import { Spin, Tag } from 'antd'
import getTypeSpecific from '../usePlayers/getTypeSpecific'
import Observable from 'observables/lib/Observable'
import PlayerIoType from '../PlayerIoType'

const Player = reactObserver<Props>((observe, { players, index, useGameSettingsOutput }) => {
  console.log('render player', index)

  const observable = observe(getTypeSpecific<Observable<boolean>>(
    players,
    index,
    0,
    useGameSettingsOutput,
    PlayerIoType.BOOLEAN
  ))

  return (
    <Spin spinning={observable === undefined}>
      <Tag.CheckableTag
        checked={observable !== undefined && observe(observable)}
        // checked
      >
        Player {index} Boolean Input Pressed
      </Tag.CheckableTag>
    </Spin>
  )
})

export default Player
