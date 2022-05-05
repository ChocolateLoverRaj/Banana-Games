import ObservablePromise from '../ObservablePromise'

interface DoneCallback<T> {
  observablePromise: ObservablePromise<T>
  doneCallback: () => void
}

export default DoneCallback
