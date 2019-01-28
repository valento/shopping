import React from 'react'
import { Icon, Sidebar, Segment } from 'semantic-ui-react'

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

  Control = e => {
    //
  }

  render() {
    const { visible } = this.state
    const { pointer } = this.props
    let transition = {
      top: `${pointer}px`
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
              <div className='options'>
                <li onClick={this.Control} name='up'><Icon size='large' name='arrow alternate circle up outline' /></li>
                <li onClick={this.Control} name='down'><Icon size='large' name='arrow alternate circle down outline' /></li>
                <li onClick={this.Control} name='clear'><Icon size='large' name='window close' /></li>
                <li onClick={this.Control} name='view'><Icon size='large' name='eye' /></li>
              </div>
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
