import React, { Component } from 'react'
import Botao from '../componentes/Botao'
import './Calculadora.css'
import Display from './../componentes/Display'

const estadoInicial = {
  displayValor: '0',
  limparDisplay: false,
  operacao: null,
  valores: [0, 0],
  atual: 0
}

export default class Calculadora extends Component {
  state = { ...estadoInicial }

  constructor (props) {
    super(props)
    this.limparMemoria = this.limparMemoria.bind(this)
    this.setOperacao = this.setOperacao.bind(this)
    this.addDigito = this.addDigito.bind(this)
  }
  limparMemoria () {
    console.log('limpando...')
    this.setState({ ...estadoInicial })
  }

  setOperacao (operacao) {
    console.log('Operação: ', operacao)
    if (this.state.atual === 0) {
      console.log('valor colocado na array 0')
      this.setState({ operacao, atual: 1, limparDisplay: true })
    } else {
      console.log('preencher SEGUNDA posicao do array')
      const igual = operacao === '='
      const operacaoAtual = this.state.operacao

      const valores = [...this.state.valores]
      console.log(`${valores[0]} ${operacaoAtual} ${valores[1]}`)
      try {
        valores[0] = eval(`${valores[0]} ${operacaoAtual} ${valores[1]}`)
      } catch (error) {
        valores[0] = this.state.valores[0]
      }
      valores[1] = 0

      this.setState({
        displayValor: valores[0],
        operacao: igual ? null : operacao,
        atual: igual ? 0 : 1,
        limparDisplay: !igual,
        valores
      })
    }
  }

  addDigito (d) {
    // console.log('Dígito: ', d)
    //REGRA 1: retorna caso já tenha ponto no state
    if (d === '.' && this.state.displayValor.includes('.')) {
      console.log('Valor inicial é 0.')
      return
    }
    //REGRA 2: limpar o display em duas situacao: quando o primeiro for ZERO
    // ou se a variável LIMPAR DISPLAY for true
    const limparDisplay =
      this.state.displayValor === '0' || this.state.limparDisplay
    //REGRA 3: se o LIMPAR DISPLAY for tru
    const valorAtual = limparDisplay ? '' : this.state.displayValor
    const novoDisplayValor = valorAtual + d
    this.setState({ displayValor: novoDisplayValor, limparDisplay: false })

    if (d !== '.') {
      //   console.log('é numero:', d)
      const i = this.state.atual
      const novoValor = parseFloat(novoDisplayValor)
      const valores = [...this.state.valores]
      valores[i] = novoValor
      this.setState({ valores })
      console.log('VALORES:', valores)
    }
  }

  render () {
    return (
      <div className='calculadora'>
        <Display rotulo={this.state.displayValor} />
        <Botao rotulo='AC' clicar={this.limparMemoria} triplo />
        <Botao rotulo='/' clicar={this.setOperacao} operacao />
        <Botao rotulo='7' clicar={this.addDigito} />
        <Botao rotulo='8' clicar={this.addDigito} />
        <Botao rotulo='9' clicar={this.addDigito} />
        <Botao rotulo='*' clicar={this.setOperacao} operacao />
        <Botao rotulo='4' clicar={this.addDigito} />
        <Botao rotulo='5' clicar={this.addDigito} />
        <Botao rotulo='6' clicar={this.addDigito} />
        <Botao rotulo='-' clicar={this.setOperacao} operacao />
        <Botao rotulo='1' clicar={this.addDigito} />
        <Botao rotulo='2' clicar={this.addDigito} />
        <Botao rotulo='3' clicar={this.addDigito} />
        <Botao rotulo='+' clicar={this.setOperacao} operacao />
        <Botao rotulo='0' clicar={this.addDigito} dobro />
        <Botao rotulo='.' clicar={this.addDigito} />
        <Botao rotulo='=' clicar={this.setOperacao} operacao />
      </div>
    )
  }
}
