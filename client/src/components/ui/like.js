import React from 'react'
import { Icon,Label,Button } from 'semantic-ui-react'

const LikeButton = ({lan,type,size,likes,onSoc,social}) => {
  const state = {
    ui: {
      es: ['Like it', 'Quiero verlo', 'Liked'],
      en: ['Like it', 'Can\'t Wait for it', 'You Like it']
    }
  }

  const action = type === 'like' ? 'likes' : type
  const soc = social !== undefined ? Boolean(social[type]) : false
  console.log(soc, action)

  return (
    <div className='social like'>
      <Button as='div' labelPosition='right'
        //disabled={soc}
        onClick={() => {
          if(!soc) onSoc(action)
        }}
      >
        <Button color='black' size={size}>
          {type==='interested'? <span>{state.ui[lan][1]} </span> : ''}
          <Icon.Group>
            <Icon name='heart'/>
            {soc && <Icon corner='top right' size='large' color='red' name='check' />}
          </Icon.Group>
        </Button>
        <Label basic pointing='left'>
          <span>{(likes < 1000)? likes : (likes/1000+'K')}</span>
        </Label>
      </Button>
      <div className='clear'></div>
    </div>
  )
}

export default LikeButton
