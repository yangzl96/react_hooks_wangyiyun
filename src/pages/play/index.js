import React, { memo } from 'react'

import { PlayerWrapper, PlayerLeft, PlayerRight } from './style'
export default memo(function ZLPlayer () {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <h2>info</h2>
          <h2>songContent</h2>
        </PlayerLeft>
        <PlayerRight>
          <h2>playList</h2>
          <h2>songs</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
