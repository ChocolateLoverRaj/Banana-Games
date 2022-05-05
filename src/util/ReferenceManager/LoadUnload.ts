interface LoadUnload<Input, LoadedData> {
  load: (input: Input) => LoadedData
  unload?: (input: Input, loadedData: LoadedData) => void
}

export default LoadUnload
