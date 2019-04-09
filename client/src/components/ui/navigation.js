import React from 'react'
import { Link } from 'react-router-dom'
import { Button,Icon } from 'semantic-ui-react'

export default class Navigation extends React.Component {
  state = {
    ui: {
      en: ['back', 'Home'],
      es: ['volver', 'Inicio']
    }
  }
  render() {
    const ui = this.state.ui[this.props.lan]
    return (
      <div className='ui grid padded gen-nav'>
        <Button as={Link} to='/' icon='arrow left' />
      </div>
    )
  }
}
