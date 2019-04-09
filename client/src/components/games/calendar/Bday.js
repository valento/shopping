import React from 'react'
import BdayForm from '../../forms/BdayForm'

const Bday = ({lan,onDate}) => {
  return (
    <div className='b-day'>
      <BdayForm onBday={onDate} lan={lan} />
    </div>
  )
}

export default Bday
