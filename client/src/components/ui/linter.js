import React from 'react'
import { Icon,Button } from 'semantic-ui-react'

export default class Linter extends React.Component {
  state = {
    selected: '2'
  }
  onFilter = (e, {name}) => {
    this.setState({
      selected: name
    })
    this.props.onFilter(name)
  }
  render(){
    return(
      <div className='linter'>
        <ul className='ui grid'>
          <div className='three wide column'>
  <Button onClick={this.onFilter} name='1' basic icon='arrow left' />
          </div>
          <div className='three wide column'>
  {this.props.filters && <Button onClick={this.onFilter} name='3' basic icon='exclamation' inverted={this.state.selected==='3'} />}
          </div>
          <div className='four wide column'>
  <Button onClick={this.onFilter} name='2' basic icon='circle notched' inverted={this.state.selected==='2'} />
          </div>
          <div className='three wide column'>
  {this.props.filters && <Button onClick={this.onFilter} name='4' basic icon='heart' inverted={this.state.selected==='4'} color={this.state==='4'? 'black' : 'red'} />}
          </div>
          <div className='three wide column'>
  <Button onClick={this.onFilter} name='5' basic icon='key' inverted={this.state.selected==='5'} color={this.state==='5'? 'black' : 'orange'} />
          </div>
        </ul>
      </div>
    )
  }
}
