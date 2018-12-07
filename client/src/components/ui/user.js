import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const User = props => {
  return (
    <div>
      <Link to='/account'><Icon name='user' size='small' color='grey' /></Link> |
      <Link to='/cart'><Icon name='cart' size='small' color='grey' /></Link>
    </div>
  )
}

export default User
