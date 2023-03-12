// @flow
import { ipcRenderer } from 'electron';
import type { GetState, Dispatch, DangerObject } from '../reducers/types';

export const NEW_FILE = 'NEW_FILE';
export const READ_FILES = 'READ_FILES';
export const WRITE_FILE = 'WRITE_FILE';
export const FILES_LOADED = 'FILES_LOADED';
export const CLEAR_PARSED = 'CLEAR_PARSED';

function filesLoaded(payload: DangerObject) {
  return {
    type: FILES_LOADED,
    payload
  }
}

function clearParsed() {
  return {
    type: CLEAR_PARSED
  }
}

export function readFiles() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { home: { validFiles } } = getState();

    ipcRenderer.removeAllListeners('remote-workbook-parsed');

    dispatch(clearParsed());

    setTimeout(() => {
      ipcRenderer.on('remote-workbook-parsed', (event, arg) => {
        dispatch(filesLoaded(arg));
      })

      validFiles.map(file => {
        ipcRenderer.send('remote-workbook-parse', file.path)
      })
    }, 500)
  };
}

export function writeFile() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter: { parsedFiles } } = getState();

    console.log(parsedFiles)

    // ipcRenderer.on('remote-workbook-generated', (event, arg) => {
    //   console.log(arg)
      // dispatch(filesLoaded(arg));
    // })

    // validFiles.map(file => {
    //   ipcRenderer.send('remote-workbook-generate', file.path)
    // })
  };
}

// export function incrementIfOdd() {
//   return (dispatch: Dispatch, getState: GetState) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(increment());
//   };
// }

// export function incrementAsync(delay: number = 1000) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
