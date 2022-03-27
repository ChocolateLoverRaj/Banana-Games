import Data from './Data'
import { GameSettingFns } from '../gameSetting'
import Edit from './Edit'

const fns: GameSettingFns<Data, undefined> = {
  getName: ({ data: { name } }) => name,
  renderEdit: ({ data }) => <Edit data={data} />
}

export default fns
