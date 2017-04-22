import API_KEY from '../../config/api_key';
import { createUrlParams } from '../helpers/index';
const { BrowserWindow } = window.require('electron').remote;
const request = window.require('superagent');

export const requestAccessToken = (client, options, code) => {

  request.post(options.request_uri, {
    client_id: options.client_id,
    client_secret: options.client_secret,
    code: code,
    redirect_uri: options.redirect_uri,
    grant_type: 'authorization_code'
  })
  .set("Content-Type", "application/x-www-form-urlencoded")
  .end(function (err, response) {
    // console.log(response.body);
    if (response && response.ok) {
      // Success - Received Token.
      window.localStorage.setItem(`${client}-access-token`, response.body.access_token);

      if (client === 'google') {
         if(response.body.refresh_token) {
            window.localStorage.setItem('google-refresh-token', response.body.refresh_token);
          }
          window.localStorage.setItem('google-token-start-time', Date.now());
      }
    } else {
      // Error - Show messages.
      console.log("err");
      console.log(err);
    }
  });

};

export const authenticateClient = (client, params) => {

  let authParams = {
    client_id: API_KEY[client].clientId,
    redirect_uri: params.redirectUrl,
    scope: params.scope
  };

  let urlParams = createUrlParams(authParams);
  let requestUrl = `${params.baseUrl}?${urlParams}`;

  let options = {
    client_id: API_KEY[client].clientId,
    client_secret: API_KEY[client].clientSecret,
    redirect_uri: params.redirectUrl,
    request_uri: params.requestUrl
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
      requestAccessToken(client, options, code);
    } else if (error) {
      console.log('Oops! Something went wrong and we couldn\'t' +
        'log you in using ', client, '. Please try again.');
    }
  };

  authWindow.webContents.on('will-navigate', (event, url) => {
    handleCallback(url);
  });

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    handleCallback(newUrl);
  });

  // Reset the authWindow on close
  authWindow.on('close', function() {
      authWindow = null;
  }, false);
};