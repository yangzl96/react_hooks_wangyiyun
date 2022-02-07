import * as actionTypes from './constants'

import { getSongDetail, getLyric, getSimiPlaylist, getSimiSong } from '@/services/player'
import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'
// 音乐详情
export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 查找playList是否存在当前歌曲
    const playList = getState().getIn(['player', 'playList'])
    const songIndex = playList.findIndex(song => song.id === ids)
    let song = null
    if (songIndex !== -1) { //找到了
      song = playList[songIndex]
      // 改变当前播放索引
      dispatch(changeCurrentSongIndexAction(songIndex))
      // 改变当前播放歌曲
      dispatch(changeCurrentSongAction(song))
      // 请求歌词
      dispatch(getLyricAction(song.id))
    } else {
      getSongDetail(ids).then(res => {
        song = res.songs && res.songs[0]
        if (!song) return
        // 将新请求的歌曲添加到播放列表
        // 在reducer中只是包裹了 Map 没有做深层拷贝(fromJS) 
        // 因此在这拿到的就是一个数组 可直接操作
        // 如果是fromJS包裹的 就可以调用getState().set()
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayListAction(newPlayList))
        // 新加的歌曲是在最后的
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))
        // 获取歌词
        if (!song) return
        dispatch(getLyricAction(song.id))
      })
    }
  }
}

// 音乐播放
const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
})

const changeCurrentSongIndexAction = (currentSongIndex) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  currentSongIndex
})

export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
})

// 上下曲切换 逻辑
export const changeCurrentIndexAndSongAction = (tag) => {
  // 为了拿到dispatch 不是为了做异步操作
  return (dispatch, getState) => {
    const playList = getState().getIn(['player', 'playList'])
    const sequence = getState().getIn(['player', 'sequence'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])

    // 先判断模式
    switch (sequence) {
      case 1: //随机播放
        let randomIndex = getRandomNumber(playList.length)
        console.log(randomIndex)
        // while (randomIndex === currentSongIndex) {
        //   randomIndex = getRandomNumber(playList.length)
        // }
        currentSongIndex = randomIndex
        break
      default:// 顺序播放
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) currentSongIndex = 0
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1
    }

    const currentSong = playList[currentSongIndex]
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(changeCurrentSongIndexAction(currentSongIndex))
    // 请求歌词
    dispatch(getLyricAction(currentSong.id))
  }
}

// 歌词
export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      dispatch(changeLyricListAction(lyricList))
    })
  }
}

const changeLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRICLIST,
  lyricList
})

// 当前歌词
export const changeCurrentLyricIndexAction = (currentLyricIndex) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  currentLyricIndex
})
