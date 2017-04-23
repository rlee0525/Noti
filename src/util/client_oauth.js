import { authenticateClient } from './oauth';

export const authenticateGithub = () => {

  let baseUrl = 'https://github.com/login/oauth/authorize';
  let redirectUrl = 'http://localhost:5000/noti_github_callback';
  let requestUrl = 'https://github.com/login/oauth/access_token';
  let scope = [
    'notifications'
  ].join(' ');

  let params = { 
    baseUrl,
    redirectUrl,
    scope,
    requestUrl, 
  };

  return authenticateClient('github', params);
}; 

export const authenticateGoogle = () => {
  
  let baseUrl = 'https://accounts.google.com/o/oauth2/auth';
  let redirectUrl = 'http://localhost:5000/noti_google_callback';
  let requestUrl = 'https://accounts.google.com/o/oauth2/token';
  let scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/gmail.readonly'
  ].join(' ');

  let params = {
    baseUrl,
    redirectUrl,
    scope,
    requestUrl
  };

  return authenticateClient('google', params);
};