import { USER_SIGNED, USER_INIT, USER_LOGGED_OUT } from '../types'
import api from '../api'
import decode from 'jwt-decode'
import setAuthHeader from '../setAuthHeader'

export const userSignedIn = user => ({
  type: USER_SIGNED,
  user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const userInit = user => ({
  type: USER_INIT,
  user
})

export const log = credentials => dispatch => {
  console.log('Action: ', credentials)
  api.user.log( credentials ).then( user => {
    localStorage.valeCollectionJWT = user.token
    setAuthHeader(localStorage.valeCollectionJWT)
    dispatch(userSignedIn(user))
  })
}

export const logout = () => dispatch => {
  localStorage.removeItem('valeCollectionJWT')
  dispatch(userLoggedOut())
}

export const initUser = () => dispatch => {
  api.user.getInitUser()
  .then( user => {
    if( user ){
      dispatch(userInit(user))
    }
    else {
      setAuthHeader()
      dispatch(logout())
    }
  })
}
