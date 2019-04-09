import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const CalBkg = ({lan}) => {
  const ui ={
    es: ['Pon mi foto'],
    en: ['Put me on it']
  }
  return (
    <div>
      <p><Link to='/gallery/calendar'>{ui[lan][0]}</Link></p>
    </div>
  )
}

export default CalBkg
