import { LANGUAGE, GENDER, LOCATION, USER_SIGNED, DOMAIN_CHANGED, CATEGORY_CHANGED } from '../types'

export const settings = (state={}, action) => {
  switch (action.type) {
    case LANGUAGE :
     return {...state, language: action.language}
    case GENDER :
      return {...state, gender: action.gender}
    case DOMAIN_CHANGED :
     return {...state, domain: action.domain}
    case CATEGORY_CHANGED :
      return {...state, subdomain: action.category}
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
export const user = (state={}, action) => {
  switch (action.type) {
    case USER_SIGNED :
      return action.user
    default: return state
  }
}
