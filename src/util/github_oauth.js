import API_KEY from '../../config/api_key';
import { createUrlParams } from '../helpers/index';
const { BrowserWindow } = window.require('electron').remote;
const request = window.require('superagent');

export const requestGithubToken = (options, code) => {

  request.post('https://github.com/login/oauth/access_token', {
    client_id: options.client_id,
    client_secret: options.client_secret,
    code: code,
    redirect_uri: 'http://localhost:5000/noti_github_callback',
    grant_type: 'authorization_code'
  })
  .set("Content-Type", "application/x-www-form-urlencoded")
  .end(function (err, response) {
    // console.log(response.body);
    if (response && response.ok) {
      // Success - Received Token.
      window.localStorage.setItem('github-access-token', response.body.access_token);
    } else {
      // Error - Show messages.
      console.log("err");
      console.log(err);
    }
  });

};

export const authenticateGithub = () => {
  let baseUrl = 'https://github.com/login/oauth/authorize';
  let redirectUrl = 'http://localhost:5000/noti_github_callback';

  let scope = [
    'notifications'
  ].join(' ');

  let params = {
    client_id: API_KEY.github.clientId,
    redirect_uri: redirectUrl,
    scope: scope
  };

  let urlParams = createUrlParams(params);
  let requestUrl = `${baseUrl}?${urlParams}`;

  let options = {
    client_id: API_KEY.github.clientId,
    client_secret: API_KEY.github.clientSecret
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
    }

    if (code) {
      requestGithubToken(options, code);
    } else if (error) {
      console.log('Oops! Something went wrong and we couldn\'t' +
        'log you in using Google. Please try again.');
       // render some error
      //  console.log(error);
    }
  };

  authWindow.webContents.on('will-navigate', (event, url) => {
    console.log('will-navigate')
    handleCallback(url);
  });

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    console.log('redirect-request')
    handleCallback(newUrl);
  });

  // Reset the authWindow on close
  authWindow.on('close', function() {
      authWindow = null;
  }, false);
};