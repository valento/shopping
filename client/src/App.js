import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Top from './components/pages/Top'
import HomePage from './components/pages/HomePage'
import FashionHome from './components/pages/FashionPage'
import AccountHome from './components/pages/AccountPage'
import PromoHome from './components/pages/PromoHome'
import PerksHome from './components/pages/PerksHome'
import CartHome from './components/pages/CartPage'
import UserRoute from './components/routes/userRoute'
import GuestRoute from './components/routes/guestRoute'
import ProductList from './components/product/ProductList'
import AnyList from './components/ui/AnyList'
import MannequinHome from './components/pages/MannequinHome'
import PlayHome from './components/pages/PlayHome'
import './App.css'

const App = ({ location }) => {
  return (
    <div className="App">
      <Route location={location} path='/' component={Top} />
      <Route location={location} path='/' exact component={HomePage} />
      <Route location={location} path='/fashion/:gender' component={FashionHome} />
      <UserRoute location={location} path='/account' exact component={AccountHome}/>
      <UserRoute location={location} path='/cart' exact component={CartHome}/>
      <Route location={location} path='/proms' exact component={PromoHome} />
      <Route location={location} path='/proms/:gender/:id' component={ProductList} />
      <Route location={location} path='/perks' exact component={PerksHome} />
      <Route location={location} path='/mannequin' exact component={PlayHome} />
      <Route location={location} path='/mannequin/id' exact component={MannequinHome} />
    </div>
  )
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App
