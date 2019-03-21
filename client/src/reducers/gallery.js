import { GALLERY_SET } from '../types'

export const gallery = (state=[], action) => {
  switch (action.type) {
    case GALLERY_SET :
      return action.gallery
    default: return state
  }
}
