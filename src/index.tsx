import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { CVContainer } from './pages/cv/cv'
import './styles.css'

const Root = document.getElementById('root')
Root ? ReactDOM.render(<CVContainer />, Root) : false
