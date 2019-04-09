import React from 'react'
import { Button } from 'semantic-ui-react'

import Linter from './linter'
import BigImageFeatures from './BigImageFeatures'

const BigImage = ({indx,gallery,onSubmenu,onMenu,service}) => {
  return (
    <div className='big-image'>
      <Linter service={service} onMenu={onMenu} big={true} onFilter={()=>{}}/>
      <img src={'/img/gallery/'+gallery[indx].name+'.jpg'} alt='img'/>
      {service==='calendar' &&
        <div className='select-image'><Button color='red' content='Pick Me!' /></div>
      }
      {service!=='calendar' &&
        <BigImageFeatures indx={indx} service={service}
          id={gallery[indx].uid} onSubmenu={onSubmenu}
        />
      }
    </div>
  )
}

export default BigImage
