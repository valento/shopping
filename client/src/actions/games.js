import {
  USER_SOC_ACTION
} from '../types'
import api from '../api'

export const userSocAct = game => ({
  type: USER_SOC_ACTION,
  game
})

export const userSocAction = (mann) => dispatch => dispatch(userSocAct(mann))

export const socAction = (data) => dispatch => api.mann.manSoc(data).then()//dispatch(userSocAct(mann)
