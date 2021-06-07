import API from '../../../api/api';

export function currentTripData() {
  return {
    type: 'CURRENT_TRIP',
    payload: API.busRoute.currentTripData()
  };
}

export function saveDriverLocation(data) {
  return {
    type: 'SAVE_DRIVER_LOCATION',
    payload: API.busRoute.saveDriverLocation(data)
  };
}

export function changeDriveringStatus(data) {
  return {
    type: 'UPDATE_DRIVING_STATUS',
    payload: API.busRoute.changeDriveringStatus(data)
  };
}
