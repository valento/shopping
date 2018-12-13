import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { changeCategory } from '../../actions/'

class FashionMenu extends React.Component {

  constructor(props) {
    super(props)
    const state = {
            lan: {
              es: ['Hombre', 'Mujer'],
              en: ['Man', 'Woman']
            }
          }
  }

  handleClick(e, { index }) {
    console.log(index)
    this.props.changeCategory(index)
  }

  render() {
    const { match, category } = this.props
    const bkg = (this.props.gen === 'm')? 'man' : 'woman'

    return (
      <Menu fluid inverted size='mini'>
        <Menu.Item as={Link} to={match.url}
          active={category === '0'}
          onClick={(e, {index}) => this.props.changeCategory(index)}
          index={0}
          name='HOME'
        >
          <Icon name={bkg} color='black' size='large'/>
        </Menu.Item>
        <Menu.Item as={Link} to={`${match.url}/clothing`}
          active={category === '1'}
          onClick={(e, {index}) => this.props.changeCategory(index)}
          index={1}
          name='CLOTHING'
        />
        <Menu.Item as={Link} to={`${match.url}/footwear`}
          active={category === '2'}
          onClick={(e, {index}) => this.props.changeCategory(index)}
          index={2}
          name='FOOTWEAR'
        />
        <Menu.Item as={Link} to={`${match.url}/accessories`}
          active={category === '3'}
          onClick={(e, {index}) => this.props.changeCategory(index)}
          index={3}
          name='ACCESSORIES'
        />
      </Menu>
    )
  }
}

FashionMenu.propTypes = {
  gen: PropTypes.number.isRequired,
  category: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  category: state.settings.category
})

export default connect(mapStateToProps,{ changeCategory })(FashionMenu)
