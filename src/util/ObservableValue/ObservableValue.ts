import ValueWithEmitter from '../ValueWithEmitter'

/**
 * To make it clear that observable value is same as value with emitter
 */
type ObservableValue<T> = ValueWithEmitter<T>

export default ObservableValue
