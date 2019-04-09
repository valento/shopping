import {
  USER_UPDATED, USER_BDAY
} from '../types'
import api from '../api'

export const userUpdated = user => ({
  type: USER_UPDATED,
  user
})

export const bdayAdded = user => ({
  type: USER_BDAY,
  user
})

export const switchLanguage = () => ({})
//export const changeCategory = category => dispatch => dispatch(ch_cat(category))

export const updateUser = user => dispatch =>
  api.user.updateUser(user).then( res => {
    dispatch(userUpdated(user))
    if(user.language && user.language !== 'de') dispatch(switchLanguage(user.language))
  } )
