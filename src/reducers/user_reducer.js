import { merge } from 'lodash';
import { RECEIVE_USER } from "../actions/oauth_actions";

let _defaultState = {};

const userReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
