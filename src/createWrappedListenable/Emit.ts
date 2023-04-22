import Listener from '../listenable/Listener'

type Emit<T extends readonly unknown[]> = Listener<T>

export default Emit
