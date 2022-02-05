import { observer } from 'mobx-react-lite'
import CanCamera from './CanCamera'
import { switchCase } from '../mobx-observable-promise'
import requestCamera from './requestCamera'
import { ReactNode } from 'react'
import EditProps from './EditProps'

const Edit = observer<EditProps>(props => {
  return (
    <>
      {switchCase<string, ReactNode>(
        requestCamera,
        () => <CanCamera {...props} />,
        () => 'Requesting Camera Access',
        () => 'Error')}
    </>
  )
})

export default Edit
