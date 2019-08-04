import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { CV } from './pages/cv'
import './styles.css'

const Root = document.getElementById('root')
Root ? ReactDOM.render(<CV />, Root) : false
