import { FC } from 'react'
import { Skeleton } from 'antd'
import EditProps from './EditProps'
import KeyBindings from './KeyBindings'
import newArrayMap from '../newArrayMap'
import { css } from '@emotion/css'

const Edit: FC<EditProps> = ({ commonParam }) => {
  return (
    <>
      {commonParam !== undefined
        ? <KeyBindings keyboard={commonParam.data.keyBindings} />
        : (
          <>
            {newArrayMap(2, index => (
              <div key={index} className={css({ display: 'flex' })}>
                <Skeleton.Input active />
                <Skeleton.Button active shape='circle' />
              </div>
            ))}
            <Skeleton.Button active />
          </>)}
    </>
  )
}

export default Edit
