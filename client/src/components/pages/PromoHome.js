import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Button, Icon, Divider } from 'semantic-ui-react'
import UserDataForm from '../forms/UserDataForm'
import { updateUser } from '../../actions/'

const PromoHome = ({ gender,username,language,updateUser,email }) => {
  return(
    <div className='App-content'>
      <div className='home-page vintage'>
        <p>Please help me with some data so my Proms suit you better!</p>
        <UserDataForm
          gender={gender}
          username={username}
          language={language}
          email={email}
          onSave={updateUser}
        />
        <div className='promo general'>
          <Divider horizontal>promo</Divider>
          Face
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  gender: state.user.gender,
  username: state.user.username,
  language: state.user.language,
  email: state.user.email
})

export default connect(mapStateToProps, { updateUser })(PromoHome)
