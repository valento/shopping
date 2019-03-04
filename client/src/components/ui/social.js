import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button,Icon,Label } from 'semantic-ui-react'

import { addSocial } from '../../actions/mann'
import { userSocAction } from '../../actions/games'
import LikeButton from './like'

class SocialBar extends React.Component {
  state = {

  }
  onLike = () => {
    console.log( 'Like this: ' , this.props.id)
    this.props.userSocAction({[this.props.id]: {like: 1}})
  }
  render() {
    const {raintg,likes,lan,simple,social} = this.props
    return (
      <div className='social bar'>
        <LikeButton onLike={this.onLike} type='like' social={social} size='mini' lan={lan} likes={likes}/>
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

export default connect(null,{ addSocial, userSocAction })(SocialBar)