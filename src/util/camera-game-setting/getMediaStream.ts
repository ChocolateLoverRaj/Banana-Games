import { Data as ObservablePromise, initialize } from '../mobx-observable-promise'
import Data from './Data'

const getMediaStream = (data: Data): ObservablePromise<MediaStream> => {
  data.mediaStreamAtom.reportObserved()
  return data.mediaStreamPromise.get() ?? initialize(new Promise(() => {}))
}

export default getMediaStream
