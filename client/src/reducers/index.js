import {
  LANGUAGE, MOBILE, GENDER, LOCATION, PROMOS_LIST,
  DOMAIN_CHANGED, CATEGORY_CHANGED, CATEGORY_TREE,
  USER_INIT, USER_SIGNED, USER_UPDATED, USER_LOGGED_OUT
} from '../types'

export const settings = (state={}, action) => {
  switch (action.type) {
    case LANGUAGE :
     return {...state, language: action.language}
    case MOBILE :
      return {...state, mobile: action.mobile}
    case GENDER :
      return {...state, gender: action.gender}
    case DOMAIN_CHANGED :
      return {...state, domain: action.domain}
    case CATEGORY_CHANGED :
      return {...state, category: action.category}
    case CATEGORY_TREE :
      return {...state, taxonomy: action.taxonomy}
    default: return state
  }
}
export const location = (state={}, action) => {
  switch (action.type) {
    case LOCATION :
      return {...state, location: action.location}
    default: return state
  }
}
export const proms = (state={}, action) => {
  switch (action.type) {
    case PROMOS_LIST :
      return action.proms
    default: return state
  }
}


export const user = (state={}, action) => {
  switch (action.type) {
    case USER_SIGNED :
      return action.user
    case USER_LOGGED_OUT:
      return {}
    case USER_INIT :
      return {...state, ...action.user}
    case USER_UPDATED :
      return {...state, ...action.user}

    default: return state
  }
}
