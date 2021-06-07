import {Platform} from 'react-native';
import {check, RESULTS, request} from 'react-native-permissions';
import {PERMISSIONS} from 'react-native-permissions';

const type =
  Platform.OS == 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

export default function checkPermission(response) {
  check(type)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          response(false);
          break;
        case RESULTS.DENIED:
          request(type).then((result) => {
            if (result == 'granted') {
              response(true);
            } else {
              response(false);
            }
          });
          break;
        case RESULTS.GRANTED:
          response(true);
          break;
        case RESULTS.BLOCKED:
          response(false);
          break;
      }
    })
    .catch((error) => {
      // …
    });
}
