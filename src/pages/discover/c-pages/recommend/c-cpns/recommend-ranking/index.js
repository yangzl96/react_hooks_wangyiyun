import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getTopListAction } from '../../store/actionCreators'

import ZLThemeHeaderRCM from '@/components/theme-header-rcm'
import ZLTopRanking from '@/components/top-ranking'
import { RankingWrapper } from './style'

export default memo(function ZLRecommendRanking () {
  // state

  // redux hook
  const dispatch = useDispatch()
  const { upRanking, newRanking, originRanking } = useSelector(state => ({
    upRanking: state.getIn(['recommend', 'upRanking']),
    newRanking: state.getIn(['recommend', 'newRanking']),
    originRanking: state.getIn(['recommend', 'originRanking'])
  }), shallowEqual)

  // other hook
  useEffect(() => {
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(2))
    dispatch(getTopListAction(3))
  }, [dispatch])
  // 其他逻辑
  return (
    <RankingWrapper>
      <ZLThemeHeaderRCM title="榜单" />
      <div className='tops'>
        <ZLTopRanking info={upRanking} />
        <ZLTopRanking info={newRanking} />
        <ZLTopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  )
})
