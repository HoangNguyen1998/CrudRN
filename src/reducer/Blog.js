import * as constants from '../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.BLOGS_FETCH:
      return {...state, blogs: action.payload};
    default:
      return state;
  }
};

export default reducer;
