import reactObserver from 'observables/lib/reactObserver/reactObserver'
import Props from './Props'
import { Spin, Tag } from 'antd'
import getTypeSpecific from '../usePlayers/getTypeSpecific'
import Observable from 'observables/lib/Observable'
import PlayerIoType from '../PlayerIoType'
import { useMemoOne } from 'use-memo-one'

const Player = reactObserver<Props>((observe, { players, index, useGameSettingsOutput }) => {
  console.log('render player', index)

  // const observable = observe(getTypeSpecific<Observable<boolean>>(
  //   players,
  //   index,
  //   0,
  //   useGameSettingsOutput,
  //   PlayerIoType.BOOLEAN
  // ))

  const observableIsActive = useMemoOne(() => {
    console.log('calculate')
    return getTypeSpecific<Observable<boolean>>(
      players,
      index,
      0,
      useGameSettingsOutput,
      PlayerIoType.BOOLEAN
    )
  }, [
    players,
    index,
    0,
    useGameSettingsOutput,
    PlayerIoType.BOOLEAN
  ])
  // observableIsActive.addRemove.add(() => {})
  const observable = observe(observableIsActive) // useMemoOne(() => observe(observableIsActive), [observableIsActive])
  // observable?.addRemove.add(() => {})
  console.log(observable)

  return (
    <Spin spinning={observable === undefined}>
      <Tag.CheckableTag
        checked={observable !== undefined && observe(observable)}
        // checked
      >
        Boolean Input Pressed
      </Tag.CheckableTag>
    </Spin>
  )
})

export default Player
