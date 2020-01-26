import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import Calculadora from './main/Calculadora'

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Calculadora />, document.getElementById('root'))

serviceWorker.unregister()
