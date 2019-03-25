import React from 'react'
import { Link } from 'react-router-dom'
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
            {this.props.big? <Button onClick={this.props.onMenu} basic icon='arrow left' /> : <Button as={Link} to='/' basic icon='arrow left' />}
          </div>
          <div className='three wide column'>
{!this.props.big && this.props.filters && <Button onClick={this.onFilter} name='3' basic icon='exclamation' inverted={this.state.selected==='3'} />}
          </div>
          <div className='four wide column'>
{!this.props.big && <Button onClick={this.onFilter} name='2' basic icon='circle notched' inverted={this.state.selected==='2'} />}
          </div>
          <div className='three wide column'>
{!this.props.big && this.props.filters && <Button onClick={this.onFilter} name='4' basic icon='heart' inverted={this.state.selected==='4'} color={this.state==='4'? 'black' : 'red'} />}
          </div>
          <div className='three wide column'>
{!this.props.big && <Button as={Link} to={'/access/8'} basic icon='key' inverted={this.state.selected==='5'} color={this.state==='5'? 'black' : 'orange'} />}
          </div>
        </ul>
      </div>
    )
  }
}
