import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './RootReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import decode from 'jwt-decode'
import { userSignedIn, initUser } from './actions/auth'
import setAuthHeader from './setAuthHeader'

const initState = {
  settings: {
    language: 'en',
    domain: null,
    category: 0,
    gender: 0
  },
  proms: [],
  user: {}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(applyMiddleware(thunk))
)

if(localStorage.valeCollectionJWT){
  const jtoken = decode(localStorage.valeCollectionJWT)
  const user = {
    new_user: false,
    token: localStorage.valeCollectionJWT
  }
  setAuthHeader(localStorage.valeCollectionJWT)
  store.dispatch(userSignedIn(user))
  store.dispatch(initUser())
}

const Root = (
  <Provider store={store}>
    <Router>
      <Route component={App}/>
    </Router>
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
