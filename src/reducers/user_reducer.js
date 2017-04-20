import { merge } from 'lodash';

let _defaultState = {};

const userReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    default:
      return state;
  }
};

export default userReducer;