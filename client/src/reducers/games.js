import {
  USER_SOC_ACTION
} from '../types'

export const games = (state={}, action) => {
  switch (action.type) {
    case USER_SOC_ACTION :
      return {...state, ...action.game}

    default: return state
  }
}
