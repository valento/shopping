import { USER_SIGNED } from '../types'
import api from '../api'

export const userSignedIn = user => ({
  type: USER_SIGNED,
  user
})

export const signup = credentials => (dispatch) => {
  console.log('Action: ', credentials)
  api.user.signup( credentials ).then( user => {
    localStorage.valeCollectionJWT = user.token
    dispatch(userSignedIn(user))
  })
}
