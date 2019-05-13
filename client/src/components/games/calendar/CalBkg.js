import React from 'react'
import { Link } from 'react-router-dom'
import { Button,Icon } from 'semantic-ui-react'

const CalBkg = ({lan}) => {
  const ui ={
    es: ['Pon mi foto'],
    en: ['Put me on it']
  }
  return (
    <div>
      <p><Link to='/gallery/calendar' className='ttl'>{ui[lan][0]}<Icon name='long arrow alternate right' /></Link></p>
    </div>
  )
}

export default CalBkg
