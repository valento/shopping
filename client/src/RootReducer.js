import { combineReducers } from 'redux'

//import user from './reducers/user'
import { settings, location, proms } from './reducers/'
import { user } from './reducers/user'
import { calendar } from './reducers/calendar'
import { games } from './reducers/games'
import { gallery } from './reducers/gallery'
import { mannequins, mstate, resources, data } from './reducers/mann'

export default combineReducers({
  settings,
  location,
  user,
  calendar,
  mannequins,
  gallery,
  mstate,
  resources,
  data,
  proms,
  games
})
