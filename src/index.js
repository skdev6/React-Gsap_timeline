import React from 'react'
import ReactDOM from 'react-dom'
import './sass/global-styles.scss'
import App from './App'
import './styles/index.scss'

if (
  process.env.BUILD_MODE === 'development' ||
  process.env.BUILD_MODE === 'demo'
) {
  require('./sass/normalize-development.scss') // don't normalize on production as normalization exists on dotcom

  // Immitate prod styling
  const head = document.getElementsByTagName('head')[0]
  const link = document.createElement('link')
  link.rel = 'stylesheet'

  head.appendChild(link)
}

ReactDOM.render(<App />, document.getElementById('root'))
