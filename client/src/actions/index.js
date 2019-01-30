import {
  CATEGORY_CHANGED, CATEGORY_TREE,
  USER_UPDATED, PROMOS_LIST, DOMAIN_CHANGED
} from '../types'
import api from '../api'


export const ch_cat = category => ({
  type: CATEGORY_CHANGED,
  category
})

export const switchDomain = domain => dispatch =>
  dispatch({ type: DOMAIN_CHANGED, domain })

export const promos = proms => ({
  type: PROMOS_LIST,
  proms
})

export const setTree = taxonomy => ({
  type: CATEGORY_TREE,
  taxonomy
})

export const getStore = domain => dispatch =>
  api.collection.getCategories(domain).then( collection => dispatch(setTree(collection)) )


export const getPromos = domain => dispatch =>
  api.collection.getPromos(domain).then( proms =>  dispatch(promos(proms)) )

export const userUpdated = user => ({
  type: USER_UPDATED,
  user
})

export const changeCategory = category => dispatch => dispatch(ch_cat(category))

export const updateUser = user => dispatch =>
  api.user.updateUser(user).then( res => dispatch(userUpdated(user)) )
