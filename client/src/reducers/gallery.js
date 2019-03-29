import { GALLERY_SET,GALLERY_OBJECT } from '../types'

export const gallery = (state=[], action) => {
  switch (action.type) {
    case GALLERY_SET :
      return action.gallery
    case GALLERY_OBJECT :
      const {id,res} = action
      const ind = state.findIndex( rs => rs.uid === id)
      return [...state.slice(0,ind),
        {...state[ind], res},
        ...state.slice(ind+1)
      ]
    default: return state
  }
}
