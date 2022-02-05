import { IAtom, IObservableValue } from 'mobx'
import { Data as ObservablePromise } from '../mobx-observable-promise'

interface Data {
  name: string
  cameraId: IObservableValue<string | undefined>
  mediaStreamPromise: IObservableValue<ObservablePromise<MediaStream> | undefined>
  mediaStreamAtom: IAtom
}

export default Data
