import React from 'react'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'

import UserDataForm from '../forms/UserDataForm'
import { updateUser } from '../../actions/'
import CrowdFundUs from '../ui/CrowdFundUs'

class UserData extends React.Component {
  state = {
    ui: {
      es: ['Apóyenos', 'Porfavor, oprima aquí para mantener este proyecto vivo','Porque voy hacer esto?','o simple:'],
      en: ['Support Us', 'Click here, please to keep this project alive','Why should I do that?','or just:']
    }
  }

  saveUser = data => {
    console.log('UserData Component: ',data)
    this.props.updateUser(data)
  }

  render(){
    const {user,language} = this.props
    const mdata = !this.props.user.gender && !this.props.user.username
    const lan = this.state.ui[language]
    return (
      <div className='home-page vintage'>
        { mdata && <UserDataForm user={user} main_data={mdata} lan={language} saveUser={this.saveUser}/>}
        { !mdata && <UserDataForm user={user} main_data={mdata} lan={language} saveUser={this.saveUser}/>}
        <Divider horizontal className='promo'>{lan.slice(-1)[0]}</Divider>
        <CrowdFundUs lan={language} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  language: state.settings.language
})
export default connect(mapStateToProps,{ updateUser })(UserData)
