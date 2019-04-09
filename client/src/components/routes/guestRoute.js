import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserRoute = ({isAuthenticated, lan, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => isAuthenticated? <Component {...props} lan={lan} /> : <Redirect to='/guest' /> } />
  )
}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.token,
    lan: state.settings.language
  }
}

export default connect(mapStateToProps,null)(UserRoute)
