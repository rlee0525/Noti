import * as NotificationApi from '../util/notification_util';

export const NOTIFICATIONS = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  REQUEST: "REQUEST"
};

export const fetchNotifications = () => {
  return NotificationApi.fetchNotifications().then(
    res => res.json()
  ).then(
    resJson => console.log(resJson)
  ).catch(
    err => console.log(err)
  );
};