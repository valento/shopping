import { CATEGORY_CHANGED } from '../types'
import api from '../api'

export const ch_cat = category => ({
  type: CATEGORY_CHANGED,
  category
})

export const changeCategory = category => dispatch => dispatch(ch_cat(category))
