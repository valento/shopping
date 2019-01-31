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
//import * as serviceWorker from './serviceWorker'
import decode from 'jwt-decode'
import { userSignedIn, initUser } from './actions/auth'
import setAuthHeader from './setAuthHeader'

const initState = {
  settings: {
    language: 'es',
    domain: 1,
    category: 0,
    gender: 0,// 0-none, 1-male, 2-female
    taxonomy: []
  },
  mannequin: {
    id: 'vale',
    head: {
      main: {// hat
        index: 0,
        library: ['','vale_head_1001.png','vale_head_1002.png'],
        active: false
      }
    },
    corp: {
    top: {
      index: 0,
      library: ['','vale_corp_1001.png','vale_corp_1002.png'],
      active: false
    },
      over: {
        index: 0,
        library: ['','vale_corp_1003.png'],
        active: false
      },
      main: {
        index: 0,
        library: ['','vale_corp_1001.png','vale_corp_1002.png'],
        active: false
      },
      under: {
        index: 0,
        library: ['','vale_corp_1001.png','vale_corp_1002.png'],
        active: false
      },
      skin: {
        index: 0,
        library: ['','vale_corp_1001.png','vale_corp_1002.png'],
        active: false
      }
    },
    waist: {
      main: {
        index: 0,
        library: ['','vale_waist_1001.png','vale_waist_1002.png'],
        active: false
      }
    },
    legs: {
      under: {
        index: 0,
        library: ['0','vale_legs_1001.png','vale_legs_1002.png'],
        active: false
      }// socks/underwear
    },
    feet: {
      main: {
        index: 0,
        library: ['0','vale_foot_1001.png','vale_foot_1002.png'],
        active: false,
      }
    }
  },
  proms: [],
  user: {}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
console.log('window full: ',window.navigator.standalone)
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
//serviceWorker.unregister()
