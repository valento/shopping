import {
  USER_SOC_ACTION, MANN_SOC_ACTION
} from '../types'

export const games = (state={}, action) => {
  switch (action.type) {
    case USER_SOC_ACTION :
      return {...state, ...action.game}
    case MANN_SOC_ACTION :
    console.log('Update this: ',action.uid,action.social)
      return {...state, [action.uid]: {...state[action.uid], ...action.social}}

    default: return state
  }
}
