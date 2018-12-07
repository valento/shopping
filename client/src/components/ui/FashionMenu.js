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
              es: ['Mujer', 'Hombre'],
              en: ['Woman', 'Man']
            }
          }
  }

  handleClick(e, { name }) {
    this.props.changeCategory(name)
  }

  render() {
    const { match, category } = this.props
    const bkg = (this.props.gen === 'm')? 'man' : 'woman'
    return (
      <Menu fluid inverted size='mini'>
        <Menu.Item as={Link} to={match.url}
          active={category === 'HOME'}
          onClick={(e, {name}) => this.props.changeCategory(name)}
          name='HOME'
        >
          <Icon name={bkg} color='black' size='large'/>
        </Menu.Item>
        <Menu.Item as={Link} to={`${match.url}/clothing`}
          active={category === 'CLOTHING'}
          onClick={(e, {name}) => this.props.changeCategory(name)}
          name='CLOTHING'
        />
        <Menu.Item as={Link} to={`${match.url}/footwear`}
          active={category === 'FOOTWEAR'}
          onClick={(e, {name}) => this.props.changeCategory(name)}
          name='FOOTWEAR'
        />
        <Menu.Item as={Link} to={`${match.url}/accessories`}
          active={category === 'ACCESSORIES'}
          onClick={(e, {name}) => this.props.changeCategory(name)}
          name='ACCESSORIES'
        />
      </Menu>
    )
  }
}

FashionMenu.propTypes = {
  gen: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  category: state.settings.category
})

export default connect(mapStateToProps,{ changeCategory })(FashionMenu)
