import React from 'react'
import { Link } from 'react-router-dom'
import { Button,Icon,Label } from 'semantic-ui-react'

const SocialBar = ({raintg,likes,lan}) => {
  return (
    <div className='social bar'>
      <p>
        <Button as='div' labelPosition='right'>
          <Button color='black' size='mini'>
            <Icon name='heart' />
          </Button>
          <Label basic pointing='left'>
            <span>{likes}</span>
          </Label>
        </Button></p>
      <p><Button as={Link} to='/crowdfunding' size='mini' color='blue' icon='undo' content='Support' /></p>
    </div>
  )
}

export default SocialBar
