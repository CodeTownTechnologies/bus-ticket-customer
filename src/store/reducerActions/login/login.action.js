import API from '../../../api/api';

export function login(data) {
  return {
    type: 'LOGIN',
    payload: API.user.loginAPI(data),
  };
}

export function resumeUser(data) {
  return {
    type: 'RESUME_USER',
    payload: data,
  };
}

export function getOtp(data) {
  return {
    type: 'GET_OTP',
    payload: API.user.getOtp(data),
  };
}

export function checkOtp(data) {
  return {
    type: 'CHECK_OTP',
    payload: API.user.checkOtp(data),
  };
}

export function updatePassword(data) {
  return {
    type: 'UPDATE_PASSWORD',
    payload: API.user.updatePassword(data),
  };
}

export function profileDetail(data) {
  return {
    type: 'PROFILE_DETAIL',
    payload: API.user.profileDetail(data),
  };
}

export function updateProfile(data) {
  return {
    type: 'UPDATE_PROFILE',
    payload: API.user.updateProfile(data),
  };
}

// export function contactUs(data) {
//   return {
//     type: 'CONTACT_US',
//     payload: API.user.contactUs(data)
//   };
// }

export function signUp(data) {
  return {
    type: 'SIGNUP',
    payload: API.user.signUp(data),
  };
}

export function getCities() {
  return {
    type: 'GET_CITIES',
    payload: API.user.getCities(),
  };
}

export function get_cities_by_group(data, id) {
  console.log(data, id, '---?');
  return {
    type: 'GET_CITIES_BY_GROUP',
    payload: API.user.get_cities_by_group(data, id),
  };
}
