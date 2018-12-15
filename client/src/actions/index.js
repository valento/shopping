import { CATEGORY_CHANGED, USER_UPDATED, PROMOS_LIST } from '../types'
import api from '../api'

export const ch_cat = category => ({
  type: CATEGORY_CHANGED,
  category
})

export const promos = proms => ({
  type: PROMOS_LIST,
  proms
})

export const getPromos = g => dispatch =>
  api.collection.getPromos(g).then( proms =>  dispatch(promos(proms)) )

export const userUpdated = user => ({
  type: USER_UPDATED,
  user
})

export const changeCategory = category => dispatch => dispatch(ch_cat(category))

export const updateUser = user => dispatch =>
  api.user.updateUser(user).then( res => dispatch(userUpdated(user)) )
