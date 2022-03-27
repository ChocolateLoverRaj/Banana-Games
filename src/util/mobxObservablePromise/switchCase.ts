import Data from './Data'
import IfPending from './IfPending'
import IfRejected from './IfRejected'
import IfResolved from './IfResolved'
import PromiseState from './PromiseState'

const switchCase = <TResult, TReturn>(
  data: Data<TResult>,
  ifResolved: IfResolved<TResult, TReturn>,
  ifPending: IfPending<TReturn>,
  ifRejected: IfRejected<TReturn>
): TReturn => {
  data.atom.reportObserved()
  switch (data.state) {
    case PromiseState.RESOLVED:
      return ifResolved(data.data)
    case PromiseState.PENDING:
      return ifPending(data.data)
    case PromiseState.REJECTED:
      return ifRejected(data.data)
  }
}

export default switchCase
