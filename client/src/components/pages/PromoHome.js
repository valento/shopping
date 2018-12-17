import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Divider } from 'semantic-ui-react'
import { updateUser, getPromos } from '../../actions/'
import UserDataForm from '../forms/UserDataForm'
import PromoList from '../ui/PromoList'

class PromoHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: this.props.gender || null,
      username: this.props.username || null,
      language:  this.props.language || null
    }
  }

  componentDidMount(){
    const { gender,username } = this.props
    console.log('PromoHome Mounted: ', gender, username)
    if((gender !== 'undefined') && (username !== 'undefined')) {
      this.props.getPromos(gender)
    }
  }

  componentDidUpdate(){
    const { gender,username } = this.props
    console.log('PromoHome Mounted: ', gender, username)
    if((gender !== 'undefined') && (username !== 'undefined')) {
      this.props.getPromos(gender)
    }
  }

  onSave = data => {
    this.props.updateUser(data)
    .then(data => this.props.getPromos(data.gender))
  }

  render() {
    const { gender,username,language,updateUser,email,credit,rating } = this.props
    let bkg = (gender !== null) && (username !== null)? (gender == 1)? 'proman' : 'woman' : ''
    return(
      <div className={'App-content '+bkg}>
        <div className='home-page vintage'>
          {(gender === null) && (username === null) && <UserDataForm
            gender={gender}
            username={username}
            language={language}
            credit={credit}
            email={email}
            onSave={this.onSave}
          />}
          <div className='promo general'>
            <Divider horizontal>{(gender == 1)? 'man' : 'woman'} promos</Divider>
            {(gender !== null) && (username !== null) && <PromoList gender={gender} />}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  gender: state.user.gender,
  username: state.user.username,
  language: state.user.language,
  credit: state.user.credit,
  email: state.user.email
})

export default connect(mapStateToProps, { updateUser, getPromos })(PromoHome)
