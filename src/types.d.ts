import LazyCss from './LazyCss'

declare module '*.lazy.css' {
  const lazyCss: LazyCss
  export default lazyCss
}

declare module '*.module.scss' {
  const classNames: Record<string, string>
  export default classNames
}
