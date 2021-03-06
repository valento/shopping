import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Divider, Segment, TransitionablePortal } from 'semantic-ui-react'
import SignupPage from './SignupPage'
import WellcomeUser from '../ui/WellcomeUser'
import { initUser } from '../../actions/auth'
import CrowdFundUs from '../ui/CrowdFundUs'
import CalendarPromo from '../ui/CalendarPromo'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      es: ['Registro', 'Bienvenido'],
      en: ['Register', 'Wellcome'],
      register: true,
      portalOpen: true,
      fund_link: false
    }
  }

  initUser(logged){
    if(logged) {
      console.log('Component Did Update')
      //this.props.initUser()
    }
  }

  render() {
    //console.log(this.props.history)
    const lan = this.state[this.props.lan]
    return (
      <div className='App-content'>
        <div className='calendar-link'>
          <CalendarPromo lan={this.props.lan} />
        </div>
        <div className='fund-link'>
          {!this.props.logged && this.state.fund_link && <CrowdFundUs type='mini' lan={this.props.lan} />}
        </div>
        <div className='home-page vintage'>
          <TransitionablePortal
            onShow={this.initUser(this.props.logged)}
            open={this.state.register}
            closeOnDocumentClick={false}
            transition={{animation:'fly up', duration: 800}}
          >
            {( !this.props.logged )? (
              <Segment basic style={{width: '100vw', position: 'fixed', top: '36%', zIndex: 10 }}>
                <Divider horizontal >{lan[0]}</Divider>
                <SignupPage psw={false} lan={this.props.lan} history={this.props.history} />
              </Segment>
            ) : (
              <Segment basic style={{width: '100vw', position: 'fixed', top: '36%', zIndex: 10 }}>
                <Divider horizontal >{lan[1]}</Divider>
                <WellcomeUser lan={this.props.lan}/>
              </Segment>
            )
            }
          </TransitionablePortal>
        </div>

      </div>
    )
  }

}

HomePage.propTypes = {
  lan: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
  initUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language,
    logged: !!state.user.token
  }
}

export default connect(mapStateToProps, { initUser })(HomePage)
