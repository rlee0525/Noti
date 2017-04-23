import * as ClientOAuth from '../util/client_oauth';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const loginUser = () => dispatch => {
  ClientOAuth.authenticateGoogle(dispatch);
};

export const watchGmail = () => dispatch => {
  ClientOAuth.getGmail(dispatch);
};
