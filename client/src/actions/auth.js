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

export const initateUser = user => ({
  type: USER_INIT,
  user
})

export const log = credentials => (dispatch) => {
  console.log('Action: ', credentials)
  api.user.log( credentials ).then( user => {
    localStorage.valeCollectionJWT = user.token
    setAuthHeader(localStorage.valeCollectionJWT)
    const token = decode(localStorage.valeCollectionJWT)
    user.email = token.email
    user.username = user.username || null
    user.language = user.language || null
    user.credit = user.credit || 10
    user.gender = user.gender || null
    user.rating = user.rating || null
    dispatch(userSignedIn(user))
  })
}

export const logout = () => dispatch => {
  localStorage.removeItem('valeCollectionJWT')
  dispatch(userLoggedOut())
}

export const initUser = () => dispatch => {
  api.user.getInitUser().then( user => {
    if(user) {
      dispatch(initateUser(user))
    } else {
      setAuthHeader()
      dispatch(logout())
    }
    //dispatch(userSignedIn(user))
  })
}
