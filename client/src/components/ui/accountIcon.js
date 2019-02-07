import React from 'react'
import { Icon, Label, Button } from 'semantic-ui-react'
const AccountIcon = props => {
  return (
    <div className='main-icon'>
      <Label pointing='below' color='black' basic size='large'>{props.name}</Label>
      <div className='iconic dot'>
        {props.value}
      </div>
    </div>
  )
}

export default AccountIcon
