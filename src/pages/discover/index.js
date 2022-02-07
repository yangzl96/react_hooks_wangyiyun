import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { dicoverMenu } from '@/services/local-data'
import {
  DiscoverWrapper,
  TopMenu
} from './style'
import { renderRoutes } from 'react-router-config'

export default memo(function ZLDiscover (props) {
  
  // 通过renderRoutes渲染的时候，会在props中拿到route这个属性
  const { route } = props
  return (
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className="wrap-v1">
          {
            dicoverMenu.map((item, index) => {
              return (
                <div className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  )
})
