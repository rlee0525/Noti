import API_KEY from '../../config/api_key';
import { createUrlParams } from '../helpers/index';
const { BrowserWindow } = window.require('electron').remote;
const request = window.require('superagent');

const requestGoogleToken = (options, code) => {

  request.post('https://accounts.google.com/o/oauth2/token', {
    client_id: options.client_id,
    client_secret: options.client_secret,
    code: code,
    redirect_uri: 'http://localhost:5000/oauth2callback',
    grant_type: 'authorization_code'
  })
  .set("Content-Type", "application/x-www-form-urlencoded")
  .end(function (err, response) {
    // console.log(response.body);
    if (response && response.ok) {
      // Success - Received Token.
      // window.localStorage.clear();
      // console.log('setting access and refresh tokens');
      if(response.body.refresh_token) {
        window.localStorage.setItem('google-refresh-token', response.body.refresh_token);
      }
      window.localStorage.setItem('google-access-token', response.body.access_token);
      window.localStorage.setItem('google-token-start-time', Date.now());

      // window.setInterval(refreshToken, 3400000);
    } else {
      // Error - Show messages.
      console.log("err");
      console.log(err);
    }
  });

};

export const authenticateUser = dispatch => {
  let baseUrl = 'https://accounts.google.com/o/oauth2/auth';
  let redirectUrl = 'http://localhost:5000/oauth2callback';
  let scope = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' ');

  let params = {
    client_id: API_KEY.google.clientId,
    redirect_uri: redirectUrl,
    scope: scope,
    response_type: 'code',
    access_type: 'offline'
  };

  let urlParams = createUrlParams(params);

  let requestUrl = `${baseUrl}?${urlParams}`;

  let options = {
    client_id: API_KEY.google.clientId,
    client_secret: API_KEY.google.clientSecret,
    scope: scope
  };

  let authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  });

  authWindow.loadURL(requestUrl);
  authWindow.show();

  const handleCallback = url => {
    let rawCode = /code=([^&]*)/.exec(url) || null;
    let code = (rawCode && rawCode.length > 1) ? rawCode[1] : null;
    let error = /\?error=(.+)$/.exec(url);

    if (code || error) {
      authWindow.destroy();
      setTimeout(() => loginUser(dispatch), 1000);
    }

    if (code) {
      requestGoogleToken(options, code);
    } else if (error) {
      console.log('Oops! Something went wrong and we couldn\'t' +
        'log you in using Google. Please try again.');
       // render some error
      //  console.log(error);
    }
  };

  // authWindow.webContents.on('will-navigate', (event, url) => {
  //   handleCallback(url);
  // });

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    handleCallback(newUrl);
  });

  // Reset the authWindow on close
  authWindow.on('close', function() {
      authWindow = null;
  }, false);
};

export const loginUser = dispatch => {
  // console.log('do login redux here');
  dispatch(fetchUserInfo());
};

export const fetchUserInfo = () => dispatch => {
  let accessToken = localStorage.getItem('google-access-token');

  request
    .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
    .end((err, response) => {
      console.log(response);
      if (response && response.ok) {
        localStorage.setItem('google-user', JSON.stringify(response.body));
        dispatch({
          type: "RECEIVE_USER",
          user: response.body
        });
      } else {
        // Error - Show messages.
        console.log("err");
        console.log(err);
      }
    });
};

export const refreshToken = () => {
  // console.log('refreshing');
  request.post('https://accounts.google.com/o/oauth2/token', {
    client_id: API_KEY.google.clientId,
    client_secret: API_KEY.google.clientSecret,
    refresh_token: localStorage.getItem('google-refresh-token'),
    grant_type: 'refresh_token'
  })
  .set("Content-Type", "application/x-www-form-urlencoded")
  .end(function (err, response) {
    // console.log(response.body);
    if (response && response.ok) {
      // Success - Received Token.
      window.localStorage.setItem('google-access-token', response.body.access_token);
      window.localStorage.setItem('google-token-start-time', Date.now());
    } else {
      // Error - Show messages.
      console.log("err");
      localStorage.setItem('google-user', null);
      console.log(err);
    }
  });
};

export const getGmail = () => {
  let userId = JSON.parse(window.localStorage.getItem('google-user')).email;

  request.post(`https://www.googleapis.com/gmail/v1/users/${userId}/watch`, {
                  key: localStorage.getItem('google-access-token')
                })
         .send({ topicName: "projects/noti-165302/topics/gmail" })
         .set("Content-Type", "application/json")
         .end(function (err, response) {
           if (response && response.ok) {
             console.log("Success");
             console.log(response.body);
           } else {
             console.log("NOPE");
             console.log(err);
           }
         });
};