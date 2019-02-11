import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon } from 'semantic-ui-react'
 import { getListMann } from '../../actions/mann'

class PlayHome extends React.Component {

  componentDidMount(){
    const gender = this.props.gender
    console.log(gender)
    this.props.getListMann(gender)
  }

  render() {
    return (
      <div className='App-content'>
        <div className='mann-page'>
          <div className='mann-overlay vintage labeled'>
            <p className='paraf-big'>Mannequins</p>
            <ul>
              <li>
                <div>Title</div>
                <img src='/img/mannequin/l_1001.png'/>
              </li>
              <li>
                <div>Title</div>
                <img src='/img/mannequin/l_1002.png'/>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
 const mapStateToProps = state => ({
   gender: state.user.gender || state.settings.gender
 })
export default connect(mapStateToProps, { getListMann })(PlayHome)
