import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getSizeImage, formatDate, getPlayUrl } from '@/utils/format-utils'
import { getSongDetailAction, changeSequenceAction, changeCurrentIndexAndSongAction, changeCurrentLyricIndexAction } from '../store/actionCreators'

import { Slider, message } from 'antd'
import { NavLink } from 'react-router-dom'
import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'


export default memo(function ZLAppPlayerBar () {
  // state
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  // 进度条是否被拖拽
  const [isChanging, setIsChanging] = useState(false)
  // 当前是否在播放
  const [isPlaying, setIsPlaying] = useState(false)

  // redux hook
  const dispatch = useDispatch()
  const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(state => ({
    currentSong: state.getIn(['player', 'currentSong']),
    sequence: state.getIn(['player', 'sequence']),
    lyricList: state.getIn(['player', 'lyricList']),
    currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
  }), shallowEqual)

  // other hook
  const audioRef = useRef()
  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])

  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id)
    // audioRef.current.play() 刚进来就调用这个方式是会报错的 谷歌浏览器不支持一来就播放
    // 但是play() 返回的是一个promise 可以解决控制台报错
    audioRef.current.play().then(res => {
      setIsPlaying(true)
    }).catch(err => {
      setIsPlaying(false)
    })
  }, [currentSong])

  // 其他逻辑
  const picUrl = (currentSong.al && currentSong.al.picUrl) || ''
  const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手'
  const duration = currentSong.dt || 0
  const showDuration = formatDate(duration, 'mm:ss')
  const showCurrentTime = formatDate(currentTime, 'mm:ss')

  // 因为progress 要时刻重绘已保证位置实时变化 所以得放在state
  // const progress = currentTime / duration * 100
  // 控制 播放暂停
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    // 设置取反状态
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // 音频时间变化
  const timeUpdate = (e) => {
    let currentTime = e.target.currentTime
    if (!isChanging) {
      // 拿到毫秒数 因为  duration 是毫秒
      setCurrentTime(currentTime * 1000)
      // 没拖拽的时候 实时改变进度条 * 100 是因为 progress
      setProgress(currentTime * 1000 / duration * 100)
    }
    // 获取当前的歌词
    let i = 0
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i]
      if (currentTime * 1000 < lyricItem.time) {
        break
      }
    }
    // 拿到当前歌词 
    // 这里因为时间一直在所以会一直触发 所以判断加上条件
    if (currentLyricIndex !== (i - 1)) {
      dispatch(changeCurrentLyricIndexAction(i - 1))
      console.log(lyricList[i-1])
      const content = lyricList[i - 1] && lyricList[i - 1].content
      message.open({
        content: content
      })
    }
  }

  // slider 操作
  // 传入组件的函数一定要使用useCallback 避免不必要的组件刷新
  // 拖拽的过程
  const sliderChange = useCallback((value) => {
    // 停止 timeUpdate更新时间和进度
    setIsChanging(true)
    // 拖拽 设置右边的时间实时变化 是毫秒
    const currentTime = value / 100 * duration
    setCurrentTime(currentTime)
    // 拖拽 实时改变进度
    setProgress(value)
  }, [duration])

  // 拖拽结束
  const sliderAfterChange = useCallback((value) => {
    // 先根据滑动的距离改变进度条的位置
    // value / 100  * duration -> 毫秒
    // 拿到具体的位置 这里要秒 因为 audioRef.current.currentTime
    const currentTime = value / 100 * duration / 1000
    audioRef.current.currentTime = currentTime
    /**
     * setCurrentTime(currentTime * 1000)
     * 解决 拖动的时候 松手后 会有回弹一下
     */
    // 立马设置一下 毫秒
    setCurrentTime(currentTime * 1000)
    // 进度条继续根据时间改变
    setIsChanging(false)
    // 控制拖拽结束后是否播放
    if (!isPlaying) {
      playMusic()
    }
  }, [duration, isPlaying, playMusic])

  // 播放模式设置
  const changeSequence = () => {
    let currentSequence = sequence + 1
    if (currentSequence > 2) {
      currentSequence = 0
    }
    dispatch(changeSequenceAction(currentSequence))
  }

  // 切换上下曲
  // 要考虑第一和最后的临界值 以及当前播放的模式
  // 涉及逻辑有点多 不建议在这里处理逻辑
  const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag))
  }

  // 当音乐播放结束
  const handleMusicEnded = () => {
    if (sequence === 2) { //单曲循环
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(changeCurrentIndexAndSongAction(1))
    }
  }

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar prev" onClick={e => changeMusic(-1)}></button>
          <button className="sprite_playbar play" onClick={e => playMusic()}></button>
          <button className="sprite_playbar next" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image" >
            <NavLink to='/discover/player'>
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="#" className="singer-name">{singerName}</a>
            </div>
            <div className="progress">
              <Slider onChange={sliderChange} onAfterChange={sliderAfterChange} defaultValue={0} value={progress} />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop" onClick={e => changeSequence()}></button>
            <button className="sprite_playbar btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={e => handleMusicEnded(e)} />
    </PlaybarWrapper>
  )
})
