import {
  BODY_ACTIVATED, LAYER_ACTIVATED, MANN_UPDATED, DATA_UPDATED, MANN_ACTIVATED,
  RESOURCE_CHANGED, RESOURCES_SET
} from '../types'

export const mannequins = ( state=[], action ) => {
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

export const mstate = ( state=[], action ) => {
  switch (action.type) {
    default: return state
  }
}

export const data = ( state=[], action ) => {
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
     return action.resources
    default: return state
  }
}
