import { createUrlParams } from '../helpers';

export const fetchNotifications = () => {
  const baseUrl = 'https://api.github.com/notifications?participating=true';

  let token = localStorage.getItem('github-access-token');
  console.log('fetching')
  return fetch(`${baseUrl}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`, 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
};