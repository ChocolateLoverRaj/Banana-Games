import * as React from 'react'
import { FC } from 'react'
import Helmet from 'react-helmet'
import { page } from './IndexPage.module.scss'
import { HashRouter } from 'react-router-dom'
import Content from './Content'
import Menu from './Menu'

const IndexPage: FC = () => (
  <HashRouter hashType='noslash'>
    <Helmet>
      <title>Games</title>
    </Helmet>
    <div className={page}>
      <div>
        <Menu />
      </div>
      <div>
        <Content />
      </div>
    </div>
  </HashRouter>
)

export default IndexPage
