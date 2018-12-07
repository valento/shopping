import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserRoute = ({component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => <Component {...props} /> } />
  )
}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps,null)(UserRoute)
