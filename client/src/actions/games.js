import {
  USER_SOC_ACTION
} from '../types'
import api from '../api'

export const userSocAct = game => ({
  type: USER_SOC_ACTION,
  game
})

export const userSocAction = (user,mann,act) => dispatch => dispatch(userSocAct(user,mann))
