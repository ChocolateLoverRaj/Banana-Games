import { Button } from 'antd'
import { FC } from 'react'
import Props from './Props'

const PresetChooser: FC<Props> = ({ presets, onChoose }) => {
  return (
    <>
      {presets?.map(({ name, id: index }) => (
        <Button
          key={index}
          size='large'
          onClick={() => onChoose(index)}
        >
          {name}
        </Button>
      ))}
    </>
  )
}

export default PresetChooser
