import { REHYDRATE } from 'redux-persist/constants';

import * as types from '../constants/ActionTypes';

/*
 * localUsn分为note, notebook, tag三个，同步的时候分别获取过期的notebook, note, tag, 互相不会干扰
 */
const initialState = {
  localUsn: {
    note: 0,
    notebook: 0,
    tag: 0,
  }
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.GET_NOTES_SUCCESS:
    case types.UPDATE_NOTE_SUCCESS:
    case types.ADD_NOTE_SUCCESS:
      return {
        ...state,
        localUsn: {
          ...state.localUsn,
          note: Math.max(getMaxUsn(action.payload.entities), state.localUsn.note),
        },
      };
    case types.GET_NOTEBOOKS_SUCCESS:
      if (action.payload.result.length) {
        return {
          ...state,
          localUsn: {
            ...state.localUsn,
            notebook: getMaxUsn(action.payload.entities),
          }
        }
      }
      return state;
    case types.AUTH_SUCCESS:
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
}

function getMaxUsn(entities) {
  let usn = 0;
  for (let type in entities) {
    for (let id in entities[type]) {
      usn = Math.max(usn, entities[type][id].usn || 0);
    }
  }
  return usn;
}
