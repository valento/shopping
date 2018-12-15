import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const GuestRoute = ({component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => <Component {...props} /> } />
  )
}

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps,null)(GuestRoute)
