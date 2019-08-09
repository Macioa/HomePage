import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ThreeCanvas } from './components/name'
import './styles.css'

const Root = document.getElementById('root')
Root ? ReactDOM.render(<ThreeCanvas />, Root) : false
