import { GALLERY_SET,GALLERY_OBJECT,GALLERY_SOCIAL_DATA } from '../types'

export const gallery = (state=[], action) => {
  const {id,res} = action
  let ind
  switch (action.type) {
    case GALLERY_SET :
      return action.gallery
    case GALLERY_SOCIAL_DATA :
      ind = state.findIndex( rs => rs.uid === id)
      console.log(res)
      return [...state.slice(0,ind),
        {...state[ind].res, ...res},
        ...state.slice(ind+1)
      ]
    case GALLERY_OBJECT :
      ind = state.findIndex( rs => rs.uid === id)
      return [...state.slice(0,ind),
        {...state[ind], res},
        ...state.slice(ind+1)
      ]
    default: return state
  }
}
