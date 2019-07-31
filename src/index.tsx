import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Hello } from './components/hello'

const Root = document.getElementById('root')
console.log(Root)
Root
  ? ReactDOM.render(<Hello compiler='TypeScript' framework='React' />, Root)
  : false
