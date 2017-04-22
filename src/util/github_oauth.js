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