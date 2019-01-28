import React from 'react'
import { Icon } from 'semantic-ui-react'

const Sign = props => {
  const style = {
    fontSize: props.fontsize
  }
  const { fontsize, come } = props
  let iconsize = (fontsize < 20)? 'small' : ((fontsize > 23)? 'large' : null)
  return (
    <div className='brand'>
      {(iconsize)? <Icon name='heart' color='red' size={iconsize} /> : <Icon name='heart' color='red' />}
      {(come)?
      <Icon name='arrow alternate circle right outline' size={iconsize} />:
      null}
      <span style={style}>A</span>
    </div>
  )
}

export default Sign
