import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Divider, Icon } from 'semantic-ui-react'

class WellcomeUser extends React.Component {

  state = {}

  text = {
    en: ['Glad to have you back', 'or', 'or just' , 'Check these out...', 'Get your Coupon', 'Gallery', 'Windowshop', 'Welcome', 'U-Game', 'Support Us'],
    es: ['Me alegra que volviste', 'o', 'o simple' , 'Vea las gangas', 'Recibe su Bono', 'Galería', 'Vitrinando', 'Bienvenid', 'U-Game' , 'Apóyenos']
  }

  render() {
    const { gender, gen,language, new_user, username, lan } = this.props
    const u_name = (username) ? username : 'Anon'
    const l = this.text[lan]
    const wellcome = new_user ? l[7] : l[0]
    return (
      <div className='vintage'>
        <p className='paraf-mid'>{wellcome},<b> {u_name}</b></p>
        <Button as={Link} to='/gallery' fluid color='black' icon='eye' content={l[5]} />

          <Divider horizontal>{l[1]}</Divider>
          <Button as={Link} to='/mannequin' fluid color='black' icon='play circle outline' content={l[8]} />

          <Divider horizontal>{l[2]}</Divider>
          {//(!username || !gender || !language) &&
            <Button as={Link} to='/crowdfunding' fluid color='blue' content={'\u2618  ' +l[9]} />
          }

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    username: state.user.username,
    new_user: state.user.new_user,
    gender: state.user.gender,
    language: state.user.language,
    lan: state.settings.language,
    gen: state.settings.gender
  }
}

export default connect(mapStateToProps)(WellcomeUser)
/*
// Standard Welcome Menu:

<Button as={Link} to='/proms' fluid color='black'>{l[3]}</Button>
<Divider horizontal>{l[1]}</Divider>
<Button as={Link} to='/perks' fluid color='black'>{l[4]}</Button>
<Divider horizontal>{l[2]}</Divider>
<Button as={Link} to={'/fashion/'+gender} fluid color='black'>{l[5]}</Button>
*/

/*
When a customer purchases an item for a first time,
send a 10% off coupon to the customer for a next product if she/he leaves a review.

Offer a $15 off coupon if a customer buys at least three products
(The discount can be applied on an entire order or just on a particular product.).

Make a coupon with a $10 discount available if the price of any item in the cart is more than $100.

If a customer buys one product from a category, send an email with a coupon for another one 20% off.

Offer an additional 20% off coupon for specific items if a customer
buys anything from the same category within the next two weeks.

Offer a $5 gift card if a customer purchased at least two items this month (spent a min. of $50).

Make a coupon for a more expensive variant of a product available
in the price of a cheaper variant if the order value is more than $100.
*/
