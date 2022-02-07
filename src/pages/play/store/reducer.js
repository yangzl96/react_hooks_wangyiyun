import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  currentSong: {},
  playList: [],
  currentSongIndex: 0,
  sequence: 0, //0循环 1随机 2单曲
  lyricList: [],
  currentLyricIndex: 0 //当前歌词的索引
})

function reducer (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong)
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set('playList', action.playList)
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.currentSongIndex)
    case actionTypes.CHANGE_SEQUENCE:
      return state.set('sequence', action.sequence)
    case actionTypes.CHANGE_LYRICLIST:
      return state.set('lyricList', action.lyricList)
    case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
      return state.set('currentLyricIndex', action.currentLyricIndex)
    default:
      return state
  }
}

export default reducer