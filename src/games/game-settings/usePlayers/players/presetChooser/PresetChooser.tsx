import { Button } from 'antd'
import { FC } from 'react'
import Props from './Props'

const PresetChooser: FC<Props> = ({ presets, onChoose }) => {
  return (
    <>
      {presets?.map(({ name, id }) => (
        <Button
          key={id}
          size='large'
          onClick={() => onChoose(id)}
        >
          {name}
        </Button>
      ))}
    </>
  )
}

export default PresetChooser
