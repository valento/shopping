import { USER_SOC_ACTION, MANN_SOC_ACTION } from '../types'

import api from '../api'

export const updateLikes = (uid,social) => ({
  type: MANN_SOC_ACTION,
  uid: uid,
  social: social
})

export const userSocAct = game => ({
  type: USER_SOC_ACTION,
  game
})

export const userSocAction = game => dispatch => dispatch(userSocAct(game))

export const socAction = data => dispatch => api.mann.manSoc(data)

export const getSocialData = (uid,act) => dispatch => api.mann.getMannSoc(uid,act)
  .then(res => {
    const social={}
    social[act]=res.data
    dispatch(updateLikes(uid,social))
  })
