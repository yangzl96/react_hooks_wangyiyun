import React, { memo } from 'react'
import ZLTopBanner from './c-cpns/top-banner'
import { RecommendWraper, Content, RecommendLeft, RecommendRight } from './style'
import ZLHotRecommend from './c-cpns/hot-recommend'
import ZLNewAlbum from './c-cpns/new-album'
import ZLRecommendRanking from './c-cpns/recommend-ranking'
import ZLUserLogin from './c-cpns/user-login'
import ZLSettleSinger from './c-cpns/setter-singer'
import ZLHotAnchor from './c-cpns/hot-anchor'

function ZLRecommend () {
  return (
    <RecommendWraper>
      <ZLTopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <ZLHotRecommend />
          <ZLNewAlbum />
          <ZLRecommendRanking />
        </RecommendLeft>
        <RecommendRight>
          <ZLUserLogin />
          <ZLSettleSinger />
          <ZLHotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
}


export default memo(ZLRecommend)