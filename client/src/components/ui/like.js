import React from 'react'
import { connect } from 'react-redux'
import { Icon,Label,Button } from 'semantic-ui-react'

const LikeButton = ({lan,type,size,likes,onLike,social}) => {
  const state = {
    ui: {
      es: ['Like it', 'Quiero verlo', 'Liked'],
      en: ['Like it', 'Can\'t Wait for it', 'You Like it']
    }
  }

  return (
    <div>
      <Button as='div' disabled={social !== undefined ? social.like : 0} labelPosition='right' onClick={onLike}>
        <Button color='black' size={size}>
          {type==='coming'? <span>{state.ui[lan][1]}</span> : ''}
          <Icon name='heart'/>
        </Button>
        <Label basic pointing='left'>
          <span>{likes}</span>
        </Label>
      </Button>
    </div>
  )
}

export default LikeButton
