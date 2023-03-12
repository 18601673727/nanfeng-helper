import { ADD_FILE, DEL_FILE, CLEAR_FILES } from '../actions/home';

const initState = {
  validFiles: [],
}

export default function home(state = initState, action) {
  switch (action.type) {
    case ADD_FILE:
      return Object.assign({}, state, {
        validFiles: action.payload,
      });
    case DEL_FILE:
      return Object.assign({}, state, {
        validFiles: [...state.validFiles.slice(0, action.index), ...state.validFiles.slice(action.index + 1)],
      });
    case CLEAR_FILES:
      return Object.assign({}, state, {
        validFiles: [],
      });
    default:
      return state;
  }
}
