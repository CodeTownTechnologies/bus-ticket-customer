import API from '../../../api/api';

export function breakdown(data) {
  return {
    type: 'BREAKDOWN',
    payload: API.breakdown.breakdown(data)
  };
}