import reducer from "./reducer";
// 如果这个action在其他地方被用到
import { getSongDetailAction, changeSequenceAction } from './actionCreators'
export {
  reducer,
  getSongDetailAction
}