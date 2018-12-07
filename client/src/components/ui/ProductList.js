import React from 'react'

export default class ProductList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>ProductList: {this.props.location.pathname}</div>
    )
  }
}
