import theme from './theme'

const getBackgroundColor = (): 'black' | 'white' => theme.theme === 'dark' ? 'black' : 'white'

export default getBackgroundColor
