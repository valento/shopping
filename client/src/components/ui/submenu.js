import React from 'react'
import { Icon,Button } from 'semantic-ui-react'

export default class Submenu extends React.Component {

  render(){
    return(
      <div className='linter submenu'>
  <Button onClick={this.props.onMenu} basic icon='arrow left' />
      </div>
    )
  }
}
