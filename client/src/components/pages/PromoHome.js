import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Button, Icon, Divider } from 'semantic-ui-react'
import { updateUser } from '../../actions/'
import UserDataForm from '../forms/UserDataForm'
import PromoList from '../ui/PromoList'

const PromoHome = ({ gender,username,language,updateUser,email,credit,rating }) => {
  let bkg = (gender !== null) && (username !== null)? (gender > 0)? 'proman' : 'woman' : ''
  return(
    <div className={'App-content '+bkg}>
      <div className='home-page vintage'>
        {(gender === null) && (username === null) && <UserDataForm
          gender={gender}
          username={username}
          language={language}
          credit={credit}
          email={email}
          onSave={updateUser}
        />}
        <div className='promo general'>
          <Divider horizontal>{gender? 'man' : 'woman'} promos</Divider>
          {(gender !== null) && (username !== null) && <PromoList gender={gender} />}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  gender: state.user.gender,
  username: state.user.username,
  language: state.user.language,
  credit: state.user.credit,
  email: state.user.email
})

export default connect(mapStateToProps, { updateUser })(PromoHome)
