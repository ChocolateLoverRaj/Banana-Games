import * as React from 'react'
import Logo from './Logo'
import { renderToString } from 'react-dom/server'
import ensureDir from '@appgeist/ensure-dir'
import { join } from 'path'
import { writeFileSync } from 'fs'

// TODO: Use sync function once https://github.com/appgeist/ensure-dir/issues/6 is done
const publicDir = join(__dirname, '../public')
const logoPath = join(publicDir, 'logo.svg')

;(async () => {
  await ensureDir(publicDir)
  const svg = renderToString(<Logo />)
  writeFileSync(logoPath, svg)
})().catch(e => {
  console.error(e)
  process.exit(1)
})
