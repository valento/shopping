import { BODY_ACTIVATED, MANN_UPDATED, LAYER_ACTIVATED, ITEM_CHANGED} from '../types'

export const updateMann = ( mannequin, layer, body ) => ({
  type: MANN_UPDATED,
  layer: layer,
  body: body,
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
