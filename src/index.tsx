import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ThreeCanvas } from './components/Three'
import { Footer } from './components/Footer'

import * as styles from './styles.css'

import './styles.css'

const Root = document.getElementById('root')
Root
  ? ReactDOM.render(
      <div style={{ width: '100%', height: '100%' }}>
        <ThreeCanvas className={styles.threej} />
        <Footer />
      </div>,
      Root
    )
  : false
