import { BODY_ACTIVATED, MANN_UPDATED, LAYER_ACTIVATED, ITEM_CHANGED} from '../types'
import api from '../api'

export const updateMann = mannequin => ({
  type: MANN_UPDATED,
  mannequin
})

export const changeLayer = layer => ({
  type: LAYER_ACTIVATED,
  layer
})

export const changeBody = body => ({
  type: BODY_ACTIVATED,
  body
})

export const changeItem = item => ({
  type: ITEM_CHANGED,
  item
})

export const getListMann = gender => dispatch => {
  api.mann.listMann(gender).then( res => {
    dispatch(updateMann(res))
  })
}
