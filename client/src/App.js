import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import MannequinComming from './components/mannequin/comming'
import PlayHome from './components/pages/PlayHome'
import UserData from './components/pages/UserData'
import CrowdfundHome from './components/pages/CrowdfundHome'
import './App.css'

const App = ({ location, mobile }) => {
  return (
    mobile ? (
      <div className="App">
        <Route location={location} path='/' component={Top} />
        <Route location={location} path='/' exact component={HomePage} />
        <Route location={location} path='/fashion/:gender' component={FashionHome} />
        <UserRoute location={location} path='/account/user' exact component={UserData}/>
        <UserRoute location={location} path='/account' exact component={AccountHome}/>
        <UserRoute location={location} path='/crowdfunding' exact component={CrowdfundHome}/>
        <UserRoute location={location} path='/cart' exact component={CartHome}/>
        <Route location={location} path='/proms' exact component={PromoHome} />
        <Route location={location} path='/proms/:gender/:id' component={ProductList} />
        <Route location={location} path='/perks' exact component={PerksHome} />
        <Route location={location} path='/mannequin' exact component={PlayHome} />
        <Route location={location} path='/mannequin/:uid' exact component={MannequinHome} />
        <Route location={location} path='/mannequin/comming/:uid' exact component={MannequinComming} />
      </div>
    ) : (
      <div className="App">
        <div className="desktop">
          <h2>This is a Mobile App</h2>
          <p>Please use your Mobile Device</p>
        </div>
      </div>
    )
  )
}

App.propTypes = {
  mobile: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  mobile: state.settings.mobile
})

export default connect(mapStateToProps,null)(App)
