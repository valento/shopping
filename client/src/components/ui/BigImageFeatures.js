import React from 'react'
import { connect } from 'react-redux'
import { Button,Icon } from 'semantic-ui-react'
//import { / } from '../../actions'

class BigImageFeatures extends React.Component {
  state = {}
  onClick = (e, {name}) => {
    if (name !== 'comment') {
      this.setState({
        [name]: true
      })
    } else {
      this.setState({
        [name]: !this.state[name]
      })
    }
    if(!this.state[name]){
      this.props.onSubmenu({
        data:{
          [name]: 1,
          resource_id: this.props.id
        }
      })
    }
  }
  render() {
    let likes,shares,views,interests,orders
    const { liked,comment } = this.state
    const {res} = this.props.gal[this.props.indx]
    if(res){
      likes = (res.liked/1000>1)? (res.liked/1000).toFixed(2) + 'K' : res.liked
      views = (res.viewed/1000>1)? (res.viewed/1000).toFixed(2) + 'K' : res.viewed
    }

    return (
      <div className='padded'>
        <ul className='ui grid'>
          <div className="five wide column">
<Button as='div' onClick={this.onClick} name='liked' basic
  icon={liked? 'heart' : 'heart outline'}
  color={liked? 'red' : ''}
  content={likes}
/>
          </div>
          <div className="two wide column">
<Button as='div' onClick={this.onClick} name='comment' basic
  icon={comment? 'comment' : 'comment outline'}
/>
          </div>
          <div className="five wide column">
            <Button as='div' onClick={this.onClick} name='comment' basic
              icon='eye'
              content={views}
            />
          </div>
          <div className="two wide column">
<Button as='div' onClick={this.onClick} name='comment' basic
  icon='cloud download'
/>
          </div>
          <div className="two wide column"></div>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  gal: state.gallery
})
export default connect(mapStateToProps)(BigImageFeatures)
