import {getCall, postCall} from './helper';
import apiUrls from './apiUrls';
import Store from '../store/createStore';

let userId;
Store.subscribe(() => {
  if (Store.getState().loginReducer.user.id) {
    userId = Store.getState().loginReducer.user.id;
  }
});
export default {
  user: {
    loginAPI: (data) => postCall(apiUrls.login, data),
    getOtp: (data) => postCall(apiUrls.getOtp, data),
    checkOtp: (data) => postCall(apiUrls.checkOtp, data),
    updatePassword: (data) => postCall(apiUrls.updatePassword, data),
    profileDetail: (data) => postCall(apiUrls.profileDetail, data),
    updateProfile: (data) => postCall(apiUrls.updateProfile, data),
    // contactUs: (data) => postCall(apiUrls.contactUs, data),
    signUp: (data) => postCall(apiUrls.signUp, data),
    getCities: (data) => getCall(apiUrls.getCities, data),
    get_location_group: (data) =>
      postCall(apiUrls.get_location_group, {user_id: userId}),
    get_cities_by_group: (data, id) => {
      console.log(data, id, 'GET_YASH');
      return postCall(apiUrls.get_cities_by_group, {
        user_id: userId,
        route_type: data,
        location_group_id: id,
      });
    },
    update_location_group: (data) =>
      postCall(apiUrls.update_location_group, {
        user_id: userId,
        location_group_id: data,
      }),
  },
  home: {
    searchTrip: (data) =>
      postCall(apiUrls.searchTrip, {...data, user_id: userId}),
    tripDetails: (data) =>
      postCall(apiUrls.tripDetails, {...data, user_id: userId}),
    routeProblem: (data) =>
      postCall(apiUrls.routeProblem, {...data, user_id: userId}),
    createBooking: (data) =>
      postCall(apiUrls.createBooking, {...data, user_id: userId}),
    get_bus_type: () => postCall(apiUrls.get_bus_type, {user_id: userId}),
  },
  busRoute: {
    currentTripData: () => postCall(apiUrls.currentTripData, {user_id: 14}),
    saveDriverLocation: (data) => postCall(apiUrls.saveDriverLocation, data),
    changeDriveringStatus: (data) =>
      postCall(apiUrls.changeDriveringStatus, data),
  },
  breakdown: {
    breakdown: (data) => postCall(apiUrls.breakdown, data),
  },
  more: {
    inbox: () => postCall(apiUrls.inbox, {user_id: userId}),
  },
  ticket: {
    getActiveTickets: () =>
      postCall(apiUrls.getTickets, {user_id: userId, type: 'active'}),
    getArchivedTickets: () =>
      postCall(apiUrls.getTickets, {user_id: userId, type: 'archived'}),
  },
};
