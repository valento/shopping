import React from 'react'
import { Link } from 'react-router-dom'
import { Button,Icon,Label } from 'semantic-ui-react'
import LikeButton from './like'

class SocialBar extends React.Component {
  state = {

  }
  render() {
    const {raintg,likes,lan,simple} = this.props
    return (
      <div className='social bar'>
        <LikeButton type='like' size='mini' lan={lan} likes={likes}/>
        {
          !simple ? (
            <p><Button as={Link} to='/crowdfunding' size='mini' color='blue' icon='undo' content='Support' /></p>
          ) : ''
        }
      </div>
    )
  }

}

export default SocialBar
