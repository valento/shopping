import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { addSocial } from '../../actions/mann'
import { updateLikes, socAction } from '../../actions/games'
import LikeButton from './like'

class SocialBar extends React.Component {

  onLike = () => {
    const {id,uid} = this.props
    console.log( 'Like this: ' , this.props.id)
    let social = {}
    social.like = 1
    this.props.updateLikes(id,social)
    this.props.socAction({user_id: uid, mann_id: id, likes: 1})
  }

  render() {
    const {raintg,likes,lan,simple,social,id} = this.props
    let lks = likes
    if(social !== undefined){
      lks += social.likes
    }
    return (
      <div className='social bar'>
        <LikeButton onLike={this.onLike} type='like' social={social} size='mini' lan={lan} likes={lks}/>
        {
          !simple ? (
            <p>
              <Button as={Link} to='/crowdfunding'
                size='mini' color='blue'
                icon='undo' content='Support'
              />
            </p>
          ) : ''
        }
      </div>
    )
  }

}
const mapStateToProps = state => ({
  uid: state.user.uid
})
export default connect(mapStateToProps,{ addSocial, updateLikes, socAction })(SocialBar)
