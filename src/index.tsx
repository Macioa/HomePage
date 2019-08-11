import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ThreeCanvas } from './components/Three'
import './styles.css'

const Root = document.getElementById('root')
Root ? ReactDOM.render(<ThreeCanvas />, Root) : false
