import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { log,pass } from '../../actions/auth'
import SignupForm from '../forms/signup'

class SignupPage extends React.Component {

  submit = (data,psw) => {
    console.log('Form Component: ', data)
    if (psw) {
      this.props.pass(data)
    } else {
      this.props.log(data)
    }// .then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <div className={this.props.psw ? 'alert' : ''}>
        <SignupForm pass={this.props.psw} lan={this.props.lan} submit={this.submit} />
      </div>
    )
  }
}

SignupPage.propTypes = {
  log: PropTypes.func.isRequired,
  psw: PropTypes.bool.isRequired
}

export default connect(null, { log,pass })(SignupPage)
