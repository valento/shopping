import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { log } from '../../actions/auth'
import SignupForm from '../forms/signup'

class SignupPage extends React.Component {

  submit = data => {
    console.log('Form Component: ', data)
    this.props.log(data)// .then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <div><SignupForm submit={this.submit} /></div>
    )
  }
}

SignupPage.propTypes = {
  log: PropTypes.func.isRequired
}

export default connect(null, { log })(SignupPage)
