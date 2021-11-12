import LazyCss from './LazyCss'

declare module '*.lazy.css' {
  const lazyCss: LazyCss
  export default lazyCss
}
