import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HOT_RECOMMEND_LIMIT } from '@/common/constants'

import ZLThemeHeaderRCM from '@/components/theme-header-rcm'
import ZLSongsCover from '@/components/songs-cover'
import { HotRecommendWrapper } from './style'
import { getHotRecommendAction } from '../../store/actionCreators'

export default memo(function ZLHotRecommend () {
  //state

  // redux hooks
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.get('recommend').get('hotRecommends')
  }), shallowEqual)
  const dispatch = useDispatch()

  // other hooks
  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
  }, [dispatch])

  // 其他逻辑

  return (
    <HotRecommendWrapper>
      <ZLThemeHeaderRCM title="热门推荐" keywords={['华语', '流行', '摇滚', '民谣', '电子']} />
      <div className="recommend-list">
        {
          hotRecommends.map(item => {
            return (
              <ZLSongsCover info={item} key={item.id} />
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
