import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserAccessRoute = ({isAuthenticated, lan, access, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => isAuthenticated? <Component {...props} access={access} lan={lan} /> : <Redirect to='/' /> } />
  )
}

UserAccessRoute.propTypes = {
  component: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.token,
    lan: state.settings.language,
    access: state.user.membership
  }
}

export default connect(mapStateToProps,null)(UserAccessRoute)
