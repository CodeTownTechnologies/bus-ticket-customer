import API from '../../../api/api';

export function inbox(data) {
  return {
    type: 'INBOX',
    payload: API.more.inbox(data)
  };
}