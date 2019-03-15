import React from 'react'
import { connect } from 'react-redux'
import { Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { updateUser } from '../../actions'
import PropTypes from 'prop-types'
import UserDataForm from '../forms/UserDataForm'
import AssetIcon from '../ui/assetIcon'
import PropIcon from '../ui/propIcon'
import SignupPage from './SignupPage'

class AccountHome extends React.Component {
  state = {
    ui: {
      es: ['Esto es lo que tiene, ','Créditos','Rating','Más','Hombre','Mujer','clave nueva'],
      en: ['Here is what you have, ','Credits','Rating','More','Male','Female','new password']
    }
  }
  render() {
    const { username,credit,gender,email,rating,language,c_status } = this.props.user
    const r = (rating) ? rating : '0'
    const uname = username ? username : 'Anon'
    const lan = this.state.ui[this.props.language]
    return (
      <div className='App-content'>
        <div className='home-page vintage padded labeled'>
          {c_status === 16 && <Divider horizontal className='promo red-font'>{lan[6]}</Divider>}
          {c_status === 16 && <SignupPage psw={true} lan={this.props.language} submit={this.submit} />}
          <Divider horizontal className='promo' />
          <p className='paraf-mid'>{lan[0] + uname + ':'}</p>
          <div className='ui grid'>
            <div className='six wide column'><AssetIcon value={credit} main={true} name={lan[1]} /></div>
            <div className='six wide column'><AssetIcon value={r} main={true} name={lan[2]} /></div>
            <div className='four wide column'>
            <div className="row">{gender && <PropIcon gender={gender} lan={this.props.language} />}</div>
            <div className="row">{language && <PropIcon language={language} lan={this.props.language} />}</div>
            </div>
          </div>
          <Divider horizontal className='promo'>{lan[3]}</Divider>
          <Button as={Link} to='/account/user' fluid color='black'>{'+' + lan[1]}</Button>
          <Divider horizontal className='promo'> * </Divider>
          <Button as={Link} to='/rating' fluid color='black'>{'+' + lan[2]}</Button>
        </div>
      </div>
    )
  }
}

AccountHome.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gender: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    credit: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    c_status: PropTypes.number.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  language: state.settings.language || state.user.language,
  user: state.user
})

export default connect(mapStateToProps,{ updateUser })(AccountHome)
