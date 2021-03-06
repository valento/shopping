import React from 'react'
import { connect } from 'react-redux'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log('ProdList did Mount!')
  }

  render() {
    return (
      <div>ProductList: {this.props.category}</div>
    )
  }
}

const mapStateToProps = state => {
  return {category: state.settings.category}
}

export default connect(mapStateToProps, null)(ProductList)
