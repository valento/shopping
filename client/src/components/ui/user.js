import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Label } from 'semantic-ui-react'

const UserAccount = ({ credit }) => {
  return (
    <div>
      <div className='user-icon right-border'>
        <Link to='/account'>
          <Icon name='user' size='small' color='grey' />
          <span>{credit}</span>
        </Link>
      </div>
      <div className='user-icon'>
        <Link to='/cart'><Icon name='cart' size='small' color='grey' /></Link>
        <span></span>
      </div>
    </div>
  )
}

export default UserAccount
