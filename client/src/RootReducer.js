import { combineReducers } from 'redux'

//import user from './reducers/user'
import { settings, location, user, proms } from './reducers/'
import { mannequins, mstate, resources, data } from './reducers/mann'

export default combineReducers({
  settings,
  location,
  user,
  mannequins,
  mstate,
  resources,
  data,
  proms
})
