import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { Button,Message } from 'semantic-ui-react'

const GuestHome = ({lan}) => {
  const _ui = {
    en: ['Wellcome, Guest! You\'ve just opened the door...', 'But: Get on line, dear','Register First'],
    es: ['Visitante nuevo! Usted, apenas abrio la puerta...', 'Pero: Ponte en la fila', 'Registrate primero']
  }
  const ui = _ui[lan]
  return (
    <div className='content-page central vintage padded'>
      <Message negative header={ui[0]} content={ui[1]} />
      <Button color='black' as={Link} to='/' icon='exclamation' content={ui[2]} />
    </div>
  )
}
const mapStateToProps = state => ({
  lan: state.settings.language || state.settings.user
})
export default connect(mapStateToProps)(GuestHome)
