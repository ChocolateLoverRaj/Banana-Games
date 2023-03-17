import OnChange from '../../../../util/OnChange'

interface Input<T> {
  value: T
  onChange: OnChange<T>
}

export default Input
