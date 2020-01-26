import React from 'react'
import './Botao.css'

export default props => {
  let classes = 'botao '
  classes += props.operacao ? 'operacao' : ''
  classes += props.dobro ? 'dobro' : ''
  classes += props.triplo ? 'triplo' : ''

  return (
    <button
      onClick={e => props.clicar && props.clicar(props.rotulo)}
      className={classes}
    >
      {props.rotulo}
    </button>
  )
}
