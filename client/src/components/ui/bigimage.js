import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { bkgAdded } from '../../actions/index'

import Linter from './linter'
import BigImageFeatures from './BigImageFeatures'

const BigImage = ({indx,gallery,onSubmenu,onMenu,service,bkgAdded}) => {
  const {name,uid} = gallery[indx]
  return (
    <div className='big-image'>
      <Linter service={service} onMenu={onMenu} big={true} onFilter={()=>{}}/>
      <img src={'/img/gallery/'+name+'.jpg'} alt='img'/>
      {service==='calendar' &&
        <div className='select-image'><Button onClick={()=>bkgAdded({bkg: name})} color='red' content='Pick Me!' /></div>
      }
      {service!=='calendar' &&
        <BigImageFeatures indx={indx} service={service}
          id={uid} onSubmenu={onSubmenu}
        />
      }
    </div>
  )
}

export default connect(null, { bkgAdded })(BigImage)
