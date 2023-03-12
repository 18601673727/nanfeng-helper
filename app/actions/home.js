export const ADD_FILE = 'ADD_FILE';
export const DEL_FILE = 'DEL_FILE';
export const CLEAR_FILES = 'CLEAR_FILES';

export function clearFiles() {
  return {
    type: CLEAR_FILES,
  };
}
export function addFile(payload) {
  return {
    type: ADD_FILE,
    payload,
  };
}

export function delFile(index) {
  return {
    type: DEL_FILE,
    index,
  };
}
