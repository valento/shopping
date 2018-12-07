import React from 'react'
import { Icon } from 'semantic-ui-react'

const Sign = props => {
  const style = {
    fontSize: props.fontsize
  }
  let fontsize = Number((props.fontsize).slice(0,2))
  let iconsize = (fontsize < 20)? 'small' :
  (fontsize < 24)? '' : 'large'
  return (
    <div className='brand'>
      <Icon name='heart' color='red' size={iconsize} />{(props.come)?
      <Icon name='arrow alternate circle right outline' size={iconsize} />:
      null}
      <span style={style}>A</span>
    </div>
  )
}

export default Sign
