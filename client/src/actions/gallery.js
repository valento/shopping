import { GALLERY_SET,GALLERY_OBJECT } from '../types'
import api from '../api'

export const setGallery = gallery => ({
  type: GALLERY_SET,
  gallery
})

export const gallerySocObject = (id,res) => ({
  type: GALLERY_OBJECT,
  id: id,
  res:res
})

export const getListGallery = gender => dispatch => {
  api.gallery.getResources()
  .then( res => {
    console.log(res)
    dispatch( setGallery(res) )
  })
}

export const getSocialData = id => dispatch => {
  api.gallery.getSocData(id).then( res => {
    dispatch( gallerySocObject(id,res) )
  })
}

export const gallerySocAction = data => dispatch => {
  api.gallery.gallerySocial(data)
}
