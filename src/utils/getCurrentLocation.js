import Geolocation from '@react-native-community/geolocation';

export default function getCurrentLocation (positionResponse) {
    Geolocation.getCurrentPosition( (position) => {
            positionResponse(position)
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}