import { combineReducers } from 'redux'

//import user from './reducers/user'
import { settings, location, user, proms } from './reducers/'

export default combineReducers({
  settings,
  location,
  user,
  proms
})
