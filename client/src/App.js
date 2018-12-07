import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Top from './components/pages/Top'
import HomePage from './components/pages/HomePage'
import FashionHome from './components/pages/FashionPage'
import AccountHome from './components/pages/AccountPage'
import CartHome from './components/pages/CartPage'
import UserRoute from './components/routes/userRoute'
import './App.css'

const App = ({ location }) => {
  return (
    <div className="App">
      <Route location={location} path='/' component={Top} />
      <Route location={location} path='/' exact component={HomePage} />
      <Route location={location} path='/fashion/:gender' component={FashionHome} />
      <UserRoute location={location} path='/account' exact component={AccountHome}/>
      <UserRoute location={location} path='/cart' exact component={CartHome}/>
    </div>
  )
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App
