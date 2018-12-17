import React from 'react'
import { connect } from 'react-redux'

class AnyList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(){
    console.log('AnyList just Updated!')
  }

  render() {
    return (
      <div>AnyList: {this.props.category}</div>
    )
  }
}

const mapStateToProps = state => {
  return {category: state.settings.category}
}

export default connect(mapStateToProps, null)(AnyList)
