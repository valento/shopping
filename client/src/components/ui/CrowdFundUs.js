import React from 'react'
import { Button, Label, Divider } from 'semantic-ui-react'

const CrowdFundUs = props => {
  const state = {
    ui: {
      es: ['Apóyenos','Ayudanos a mantener este proyecto vivo','Porque voy hacer esto?'],
      en: ['Support Us','Click here, please to keep this project alive','Why should I do that?']
    }
  }
  const lan = state.ui[props.lan]
  return(
    <div className='signup vintage'>
      <p className='paraf-mid'>{lan[1]}</p>
      <Button fluid icon='undo' color='blue' content={lan[0]} />
      <Label as='a' basic color='red' inverted='true' size='big' pointing> {lan[2]} </Label>
      <Divider horizontal> * * * </Divider>
    </div>
  )
}

export default CrowdFundUs
