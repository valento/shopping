import React from 'react'
import { Route } from 'react-router-dom'

const SubmenuRoute = ({gen: gen, component: Component, ...rest}) => {
  //console.log('Submenu: ', rest)
  return (
      <Route {...rest} render={ (props) => <Component gen={gen} {...props} /> }/>
  )
}

export default SubmenuRoute
