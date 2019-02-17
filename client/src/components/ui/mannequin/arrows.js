import React from 'react'
import { Icon } from 'semantic-ui-react'

const Arrows = ({hidden, onNext}) => {
  if(hidden) return ''
  else {
    return (
      <div className='ui equal width grid mnq-arrows'>
        <div className='column' onClick={() => onNext('prev')}>
          <Icon className='column' size='large' name='arrow alternate circle left outline' />
        </div>

        <div className='column'></div>
        <div className='column'></div>

        <div className='column' onClick={() => onNext('next')}>
          <Icon className='column right' size='large' name='arrow alternate circle right outline' />
        </div>
      </div>
    )
  }
}

export default Arrows
