import React from 'react'
import { connect } from 'react-redux'
import UserDataForm from '../forms/UserDataForm'
import { updateUser } from '../../actions/'
import CrowdFundUs from '../ui/CrowdFundUs'

class UserData extends React.Component {
  state = {
    ui: {
      es: ['Apóyenos', 'Porfavor, oprima aquí para mantener este proyecto vivo','Porque voy hacer esto?'],
      en: ['Support Us', 'Click here, please to keep this project alive','Why should I do that?']
    }
  }

  addCredits = data => {
    console.log('UserData Component: ',data)
    this.props.updateUser(data)
  }

  render(){
    const {user,language} = this.props
    const lan = this.state.ui[language]
    return (
      <div className='home-page vintage'>
        <CrowdFundUs header={lan[1]} title={lan[0]} why={lan[2]} />
        {(!this.props.user.gender && !this.props.user.username) && <UserDataForm user={user} language={language} addCredits={this.addCredits}/>}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  language: state.settings.language
})
export default connect(mapStateToProps,{ updateUser })(UserData)
