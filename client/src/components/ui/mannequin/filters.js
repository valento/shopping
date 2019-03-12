import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export default class Filters extends React.Component {
  state = {
    ui: {
      es: ['todos', 'últimos', 'mejor', 'galería'],
      en: ['all', 'last', 'best', 'gallery']
    },
    filter: 0
  }

  onFilter = (e,{name}) => {
    console.log(name)
    this.setState({
      filter: name
    })
  }
  render() {
    const lan = this.state.ui[this.props.lan]
    return (
      this.props.filters ? (
        <div class='filters'>
          <Button size='mini' basic={this.state.filter !== 0} name={0} onClick={this.onFilter} content={lan[0]} />
          <Button size='mini' basic={this.state.filter !== 1} name={1} onClick={this.onFilter} content={lan[1]} />
          <Button size='mini' basic={this.state.filter !== 2} name={2} onClick={this.onFilter} content={lan[2]} />
        </div>
      ) : (
        <div>
          <Button as={Link} to='/gallery' size='big' basic name={3} onClick={this.onFilter} >{lan[3]} &raquo;</Button>
        </div>
      )
    )
  }
}
//<Link to='/gallery'>gallery</Link>
