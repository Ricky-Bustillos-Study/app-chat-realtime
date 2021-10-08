import moment from 'moment';

export function formatMessage(username: string, message: string) {
  return {
    username,
    message,
    time: moment().format('h:mm a'),
  }
}