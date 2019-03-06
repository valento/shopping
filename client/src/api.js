import axios from 'axios'

export default {
  user: {
    log: credentials => axios.post('/auth', { credentials }).then( res => res.data.user ),

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
    //manSoc: (user,mann,act) => axios.post('/games/mann', {.......}),
    listMann: gender => axios.get('list/m/mann/'+gender).then( res => res.data ),
    getResources: uid => axios.get('../list/mann/resources/'+uid).then( res => res.data )
  },
  settup: {
    setUI: () => axios.get('/ua').then( res => res.data )
  }
}
