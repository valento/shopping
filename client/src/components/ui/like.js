import React from 'react'
import { connect } from 'react-redux'
import { Icon,Label,Button } from 'semantic-ui-react'

const LikeButton = ({lan,type,size,likes}) => {
  const state = {
    ui: {
      es: ['Like it', 'Es verlo'],
      en: ['Like it', 'Wait for it']
    }
  }
  return (
    <p>
      <Button as='div' labelPosition='right'>
        <Button color='black' size={size}>
          {type==='coming'? <span>{state.ui[lan][1]}</span> : ''}<Icon name='heart' />
        </Button>
        <Label basic pointing='left'>
          <span>{likes}</span>
        </Label>
      </Button>
    </p>
  )
}

export default LikeButton
