import NetInfo from '@react-native-community/netinfo';

export default (callback) => {
  try {
    NetInfo.fetch().then((state) => {
      callback(state.isConnected);
    });
  } catch (error) {
    return error;
  }
};
