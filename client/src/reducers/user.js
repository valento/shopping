import {
  USER_INIT, USER_SIGNED, USER_UPDATED, USER_LOGGED_OUT,
  USER_BDAY
} from '../types'

export const user = (state={}, action) => {
  console.log('Reducer:',action.user)
  switch (action.type) {
    case USER_SIGNED :
      return action.user
    case USER_BDAY :
      return {...state, ...action.user}
    case USER_LOGGED_OUT:
      return {}
    case USER_INIT :
      return {...state, ...action.user}
    case USER_UPDATED :
      return {...state, ...action.user}

    default: return state
  }
}
