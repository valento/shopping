import { USER_SIGNED, USER_INIT } from '../types'
import api from '../api'
import decode from 'jwt-decode'
import setAuthHeader from '../setAuthHeader'

export const userSignedIn = user => ({
  type: USER_SIGNED,
  user
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
    dispatch(userSignedIn(user))
  })
}

export const initUser = () => dispatch => {
  api.user.getInitUser().then( user => {
    dispatch(initateUser(user))
    //dispatch(userSignedIn(user))
  })
}
