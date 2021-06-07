const initialState = {
  user: {},
  allCities: [],
  cityByGrp: [],
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.status &&
        action.payload.data.status == 'ok' &&
        action.payload.data.data
      ) {
        return {
          ...state,
          user: action.payload.data.data,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'RESUME_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'PROFILE_DETAIL': {
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.status &&
        action.payload.data.status == 'ok' &&
        action.payload.data.data
      ) {
        return {
          ...state,
          user: action.payload.data.data,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'SIGNUP': {
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.status &&
        action.payload.data.status == 'ok' &&
        action.payload.data.data
      ) {
        return {
          ...state,
          user: action.payload.data.data,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'UPDATE_PROFILE': {
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.status &&
        action.payload.data.status == 'ok' &&
        action.payload.data.data
      ) {
        return {
          ...state,
          user: action.payload.data.data,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'GET_CITIES': {
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.status &&
        action.payload.data.status == 'ok' &&
        action.payload.data.data
      ) {
        return {
          ...state,
          allCities: action.payload.data.data,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'GET_CITIES_BY_GROUP': {
      console.log('GET_CITIES_BY_GROUP', action);
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.status &&
        action.payload.data.status == 'ok' &&
        action.payload.data.data
      ) {
        let cityByGrp = [];
        if (action.payload.data.data.length > 0) {
          action.payload.data.data.map((e) => {
            cityByGrp.push({...e, id: e.city_id});
          });
        }
        return {
          ...state,
          cityByGrp,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default loginReducer;
