import React from 'react'
import { connect } from 'react-redux'

import Mannequin from '../mannequin/Mannequin'

export default class MannequinHome extends React.Component {
  state = {
    body: {
      head: 0,
      corp: 0,
      waist: 0,
      legs: 0,
      foot: 0,
    },
    settings: {
      zone: [160,320,425,630,736],
      item: ['head','corp','waist','legs','foot']
    }
  }
  onClick = e => {
    const { zone, item } = this.state.settings
    const i = zone.findIndex( el => {
      return e.clientY < el
    })
    console.log(this.state.body[item[i]])
    this.setState({body: { ...this.state.body, [item[i]]: this.state.body[item[i]] + 1}})
  }
  render() {
    const { head,corp,waist,legs,foot } = this.state.body
    return (
      <div className='App-content mannequin'>
        <div className='home-mannequin' onClick={this.onClick}>
          <Mannequin humman='head' />
          <Mannequin humman='corp' />
          <Mannequin active={true} count={waist} humman='waist' />
          <Mannequin humman='foot' />
        </div>
      </div>
    )
  }
}
