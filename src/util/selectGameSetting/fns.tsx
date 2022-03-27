import { GameSettingFns } from '../gameSetting'
import Data from './Data'
import Edit from './Edit'

const fns: GameSettingFns<Data<any>, undefined> = {
  getName: ({ data: { name } }) => name,
  reset: {
    resetToDefault: ({ data }) => {
      data.selectedOption = data.defaultOption
    },
    isSameAsDefault: ({ data: { defaultOption, selectedOption } }) =>
      selectedOption === defaultOption
  },
  renderEdit: ({ data }) => <Edit data={data} />
}

export default fns
