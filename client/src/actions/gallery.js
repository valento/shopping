import { GALLERY_SET } from '../types'
import api from '../api'

export const setGallery = gallery => ({
  type: GALLERY_SET,
  gallery
})

export const getListGallery = gender => dispatch => {
  api.gallery.getResources().then( res => {
    console.log(res)
    dispatch( setGallery(res) )
    //dispatch( updateMann(mann) )
  })
}
