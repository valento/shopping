import axios from 'axios'

export default {
  user: {
    log: credentials => axios.post('/auth', { credentials }).then( res => res.data.user ),

    getInitUser: () => axios.get('/user/data').then( res => res.data.user ),

    updateUser: user => axios.post('/user/data', { user }).then( res => {
      if(res.status !== 200) {
        //
      } else {

      }
    })
  },
  collection: {
    getPromos: g => axios.get('list/proms/'+g).then( res => res.data)
  }
}
