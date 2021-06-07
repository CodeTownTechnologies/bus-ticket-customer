import axios from 'axios';

export async function getCall(url) {
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}

export function postCall(url, data) {
  var options = {'Content-Type': 'application/x-www-form-urlencoded'};
  let params = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    params.append(key, value);
  });

  console.log('HERE_URL', url);
  console.log('PARAMS_HERE', params);
  return axios
    .post(url, params, options)
    .then((response) => response)
    .catch((error) => error);
}

export function deleteCall(url, data) {
  return axios
    .delete(url, data)
    .then((response) => {
      if (response.data.status == 'success') {
        return response.data.data;
      }
    })
    .catch((error) => {
      return error;
    });
}
