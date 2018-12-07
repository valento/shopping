import axios from 'axios'

export default {
  user: {
    signup: credentials => axios.post('/auth', { credentials }).then( res => res.data.user )
  }
}
