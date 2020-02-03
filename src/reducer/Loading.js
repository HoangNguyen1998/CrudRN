import * as constants from '../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.BLOGS_FETCH_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
};

export default reducer;
