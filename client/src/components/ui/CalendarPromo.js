import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const CalendarPromo = ({lan}) => {
  const ui = {
    en: ['The Calendar','Go Get It!'],
    es: ['El Calendario', 'Ordenar']
  }
  return (
    <div className='feature'>
      <p>{ui[lan][0]}</p>
      <Button as={Link} to='/calendar' basic inverted content={ui[lan][1]} />
    </div>
  )
}

export default CalendarPromo
