import React from 'react'
import { Icon,Statistic } from 'semantic-ui-react'
const PropIcon = ({gender,lan}) => {
  const state = {
    lng: {
      es: ['','Hombre','Mujer'],
      en: ['','Male','Female']
    }
  }
  const l = state.lng[lan][gender]
  const icn = gender>1 ? 'female' : 'male'
  return (
    <div className='main-icon iconic'>
      <Statistic size='small'>
        <Statistic.Value><Icon name={icn} /></Statistic.Value>
        <Statistic.Label>{l}</Statistic.Label>
     </Statistic>
    </div>
  )
}

export default PropIcon
