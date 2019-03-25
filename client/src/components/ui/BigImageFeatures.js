import React from 'react'
import { Button,Icon } from 'semantic-ui-react'

export default class BigImageFeatures extends React.Component {
  state = {}
  onClick = (e, {name}) => {
    this.setState({
      [name]: !this.state[name]
    })
  }
  render() {
    const { like } = this.state

    return (
      <div className='padded'>
        <ul className='ui grid'>
          <div className="four wide column">
<Button as='div' onClick={this.onClick} name='like' basic
  icon={this.state.like? 'heart' : 'heart outline'}
  color={this.state.like? 'red' : ''}
/>
          </div>
          <div className="four wide column">
<Button as='div' onClick={this.onClick} name='comment' basic
  icon={this.state.comment? 'comment' : 'comment outline'}
  color={this.state.comment? 'red' : ''}
/>
          </div>
          <div className="four wide column"></div>
          <div className="four wide column"></div>
        </ul>
      </div>
    )
  }
}
