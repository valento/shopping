import {
  LANGUAGE, GENDER, LOCATION, PROMOS_LIST,
  DOMAIN_CHANGED, CATEGORY_CHANGED, CATEGORY_TREE,
  USER_INIT, USER_SIGNED, USER_UPDATED, USER_LOGGED_OUT,
  BODY_ACTIVATED, LAYER_ACTIVATED, MANN_UPDATED, DATA_UPDATED, MANN_ACTIVATED,
  RESOURCE_CHANGED, RESOURCES_SET
} from '../types'

export const settings = (state={}, action) => {
  switch (action.type) {
    case LANGUAGE :
     return {...state, language: action.language}
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

export const mannequins = ( state={}, action ) => {
  switch (action.type) {
    case BODY_ACTIVATED :
      return {...state, body: {...state.body, ...action.body}}
    case LAYER_ACTIVATED :
      return {...state, body: {...state.body, [action.data.body]: {...state.body[action.data.body], ...action.data.layer}}}
    case MANN_UPDATED :
      return action.data
    case MANN_ACTIVATED :
      return action.man
    default: return state

  }
}

export const data = ( state={}, action ) => {
  switch (action.type) {
    case DATA_UPDATED :
    return action.data
    default: return state
  }
}

export const resources = ( state={}, action ) => {
  switch (action.type) {
    case 'RESOURCES_SET':
     return state
    case 'RESOURCE_CHANGED':
     return state
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
