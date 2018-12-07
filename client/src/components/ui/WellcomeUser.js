import React from 'react'
import { connect } from 'react-redux'
import { Button, Divider } from 'semantic-ui-react'

const WellcomeUser = (props) => {
  const text = {
    en: ['Glad to have you back, ', 'Check out the New Deals', 'Get your Coupon', 'Windowshop'],
    es: ['Me alegra que volviste, ', 'Vea las nuevas gangas', 'Colecte su Bono', 'Mira Venta']
  }
  const lan = text[props.lan]
  return (
    <div className='vintage small'>
      <p>{lan[0]} <b>{props.username}</b></p>
      <Button fluid color='black'>{lan[1]}</Button>
      <Divider horizontal>or</Divider>
      <Button fluid color='black'>{lan[2]}</Button>
      <Divider horizontal>or just</Divider>
      <Button fluid color='black'>{lan[3]}</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    lan: state.settings.language
  }
}

export default connect(mapStateToProps)(WellcomeUser)
