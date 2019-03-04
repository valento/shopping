import { combineReducers } from 'redux'

//import user from './reducers/user'
import { settings, location, proms } from './reducers/'
import { user } from './reducers/user'
import { games } from './reducers/games'
import { mannequins, mstate, resources, data } from './reducers/mann'

export default combineReducers({
  settings,
  location,
  user,
  mannequins,
  mstate,
  resources,
  data,
  proms,
  games
})
