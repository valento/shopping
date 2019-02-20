import React from 'react'
import { Icon, Sidebar, List } from 'semantic-ui-react'

export default class Controls extends React.Component {
  state = {
    visible: false
  }

  onSidebar = e => {
    if(this.props.disable) return
    this.setState({
      visible: (!this.state.visible)
    })
  }

  onControl = (e, {name}) => {
    this.props.onControl(name)
  }

  render() {
    const { visible } = this.state
    const { pointer } = this.props
    let p = (pointer > window.screen.height/2)? window.screen.height/3 : window.screen.height*2/3
    let transition = {
      top: `${p-80}px`
    }
    return (
      <div className='mannequin-controls cursor-move' style={transition}>
        <Sidebar.Pushable as='div'>
          <Sidebar
            as='div'
            animation='push'
            visible={visible}
            vertical='true'
            width='very thin'
            inverted='true'
          >
            <div className='controls-menu'>
                <List>
  <List.Item onClick={ this.onControl } name='clear'><List.Icon name='window close' size='large' /></List.Item>
  <List.Item onClick={ this.onControl } name='view'><List.Icon name='eye' size='large' /></List.Item>
  <List.Item onClick={ this.onControl } name='save'><List.Icon name='save outline' size='large' /></List.Item>
  <List.Item onClick={ this.onControl } name='share'><List.Icon name='share' size='large' /></List.Item>
                </List>
            </div>
          </Sidebar>
          <Sidebar.Pusher>
            <div className='mannequin-thong' onClick={this.onSidebar}>
              {visible? <Icon inverted name='arrow left' />:<Icon inverted name='arrow right' />}
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
