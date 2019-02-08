import React from 'react'
import { Icon,Statistic } from 'semantic-ui-react'

const PropIcon = ({lan,...rest}) => {
  const state = {
    lng: {
      es: ['','Hombre','Mujer'],
      en: ['','Male','Female']
    },
    type: ['gender','language','bday','fb','verified'],
    icn: ['']
  }
  const {gender} = rest
  const PROP = Object.keys(rest)
  switch (PROP){
    //
  }
  console.log(PROP)
  const l = state.lng[lan][gender]
  const icn = gender>1 ? 'female' : 'male'
  return (
    <div className='main-icon iconic'>
      <Statistic size='tiny'>
        <Statistic.Value><Icon name={icn} /></Statistic.Value>
        <Statistic.Label>{l}</Statistic.Label>
     </Statistic>
    </div>
  )
}

export default PropIcon
