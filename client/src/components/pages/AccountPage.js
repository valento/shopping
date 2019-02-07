import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Form, Divider, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { updateUser } from '../../actions'
import PropTypes from 'prop-types'
import UserDataForm from '../forms/UserDataForm'
import AssetIcon from '../ui/assetIcon'
import PropIcon from '../ui/propIcon'

class AccountHome extends React.Component {
  state = {
    ui: {
      es: ['Esto es lo que tiene, ','Créditos','Rating','Más','Hombre','Mujer'],
      en: ['Here is what you have, ','Credits','Rating','More','Male','Female']
    }
  }
  render() {
    const { username,credit,gender,email,rating } = this.props.user
    const r = (rating) ? rating : '0'
    const uname = username ? username : 'Anon'
    const { language } = this.props
    const lan = this.state.ui[language]
    return (
      <div className='App-content'>
        <div className='home-page vintage padded labeled'>
          <p className='paraf-mid'>{lan[0] + uname + ':'}</p>
          <AssetIcon value={credit} main={true} name={lan[1]} />
          <AssetIcon value={r} main={true} name={lan[2]} />
          {gender && <PropIcon gender={gender} lan={this.props.language} />}
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
    gender: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    credit: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  language: state.settings.language,
  user: state.user
})

export default connect(mapStateToProps,{ updateUser })(AccountHome)
