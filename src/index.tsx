import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Hello } from './components/hello'
import './styles.css'

const Root = document.getElementById('root')
Root
  ? ReactDOM.render(<Hello compiler='typescript' framework='react' />, Root)
  : false
