import { combineReducers } from 'redux'

//import user from './reducers/user'
import { settings, location, user, proms, mannequins, resources, data } from './reducers/'

export default combineReducers({
  settings,
  location,
  user,
  mannequins,
  resources,
  data,
  proms
})
