import { CALENDAR_BKG, USER_BDAY } from '../types'

export const calendar = (state={},action) => {
  switch (action.type) {
    case CALENDAR_BKG:
    console.log(action.bkg);
      return {...state, ...action.bkg}
    case USER_BDAY:
      return {...state, ...action.user}
    default: return state
  }
}
