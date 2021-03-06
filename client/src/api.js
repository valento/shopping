import axios from 'axios'

export default {
  user: {
    log: credentials => axios.post('/auth', { credentials }).then( res => res.data.user ),
    pass: credentials => axios.post('/auth/pass', { credentials }).then( res => res.data.user ),

    getInitUser: () => axios.get('/user/data')
    .then( res => {
      if(res.status !== 200) {
        console.log('Error User')
      } else {
        return res.data.user
      }
    })
    .catch( err => {
      console.log('ResStatus: ', err.message)
    }),

    updateUser: user => axios.post('/user/data', { user }).then( res => {
      if(res.status !== 200) {
        //
      } else {
        console.log(res)
      }
    })
  },
  collection: {
    getPromos: domain => axios.get('list/proms/'+domain).then( res => res.data),
    getCategories: domain => axios.get('../list/category/'+domain).then( res => res.data)
  },
  mann: {
    manSoc: data => axios.post('/games/mann', data),
    getMannSoc: (uid,act) => axios.get('/games/mann/'+act+'/'+uid).then(res => res.data),
    listMann: gender => axios.get('list/m/mann/'+gender).then( res => res.data ),
    getResources: uid => axios.get('../list/mann/resources/'+uid).then( res => res.data )
  },
  gallery: {
    getResources: () => axios.get('/gallery/gall_resources').then( res => res.data ),
    getSocData: id => axios.get('/gallery/gall_actions/'+id).then( res => res.data ),
    gallerySocial: data => axios.post('/gallery/gall_actions', data).then( res => console.log(res.data) )
  },
  settup: {
    setUI: () => axios.get('/ua').then( res => res.data )
  }
}
