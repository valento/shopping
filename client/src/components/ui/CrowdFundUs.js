import React from 'react'
import { Button, Label, Divider } from 'semantic-ui-react'

const CrwodFundUs = props => {
  return(
    <div className='signup vintage'>
      <p className='paraf-mid'>{props.header}</p>
      <Button fluid icon='undo' color='blue' content={props.title} />
      <Label as='a' basic color='red' inverted size='big' pointing> {props.why} </Label>
      <Divider horizontal> * * * </Divider>
    </div>
  )
}

export default CrwodFundUs
