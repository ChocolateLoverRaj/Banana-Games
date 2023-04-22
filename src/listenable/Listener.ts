type Listener<T extends readonly unknown[]> = (...inputs: T) => void

export default Listener
