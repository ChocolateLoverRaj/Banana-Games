import * as React from 'react'
import { FC } from 'react'
import { page } from './IndexPage.module.scss'
import { HashRouter } from 'react-router-dom'
import Content from './Content'
import Menu from './Menu'

const IndexPage: FC = () => (
  <HashRouter hashType='noslash'>
    <div className={page}>
      <div>
        <Menu />
      </div>
      <Content />
    </div>
  </HashRouter>
)

export default IndexPage
