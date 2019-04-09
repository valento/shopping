import { CALENDAR_BKG } from '../types'

export const calendar = (state={},action) => {
  switch (action.type) {
    case CALENDAR_BKG:
      return action.bkg
    default: return state
  }
}
