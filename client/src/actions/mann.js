import { BODY_ACTIVATED, MANN_UPDATED, MANN_ACTIVE_UPDATED,
  LAYER_ACTIVATED, ITEM_CHANGED, DATA_UPDATED, MANN_ACTIVATED,
  RESOURCES_SET, RESOURCE_CHANGED, MANN_SOC_ACTION
} from '../types'
import api from '../api'

export const updateData = data => ({
  type: DATA_UPDATED,
  data
})

export const updateMann = data => ({
  type: MANN_UPDATED,
  data
})

export const addSocial = data => ({
  type: MANN_SOC_ACTION,
  data
})

export const activateMann = man => ({
  type: MANN_ACTIVATED,
  man
})

export const changeBody = body => ({
  type: BODY_ACTIVATED,
  body
})

export const changeLayer = data => ({
  type: LAYER_ACTIVATED,
  data
})

export const changeItem = item => ({
  type: ITEM_CHANGED,
  item
})

export const getResource = resources => ({
  type: RESOURCE_CHANGED,
  resources
})

export const getListMann = gender => dispatch => {
  api.mann.listMann(gender).then( res => {
    let mann = []
    const mnqs = res.map( entry => {
      const {uid,head,corp,waist,legs,feet,...rest} = entry
      if(entry.c_status === 4) mann.push({uid,head,corp,waist,legs,feet})
      return({uid,rest})
    })
    console.log('Mann Actions: ',mann)
    dispatch( updateData(mnqs) )
    dispatch( updateMann(mann) )
  })
}

const body = ['feet','legs','waist','corp','head']
const lyr = ['skin','under','main','over','top']

export const getMannResources = id => dispatch => {
  api.mann.getResources(id).then( res => {
    const resources = {}
    body.forEach( b => {
      resources[b]={}
      lyr.forEach( l => {
        resources[b][l] = []
      })
    })
    res.forEach( entry => {
      resources[body[Math.log2(entry.body)]][lyr[Math.log2(entry.layer)]].push(entry.name)
    })
    dispatch(getResource(resources))
  })
}
