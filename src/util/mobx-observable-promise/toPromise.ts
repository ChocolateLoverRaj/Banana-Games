import Data from './Data'
import switchCase from './switchCase'

const toPromise = async <T>(observablePromise: Data<T>): Promise<T> => await switchCase(
  observablePromise,
  async value => await Promise.resolve(value),
  async promise => await promise,
  async err => await Promise.reject(err))

export default toPromise
