import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import _ from 'lodash';

const filters = (state = { filters: {} }, action) => {
  switch (action.type) {
    case "ADD_FILTER":
      let currentAddFilter =
        state.filters[action.name] && state.filters[action.name].length
          ? state.filters[action.name]
          : [];
      currentAddFilter.push(action.value);
      const newAddState = Object.assign({}, state.filters, {
        [action.name]: currentAddFilter
      });
      return Object.assign({}, state, { filters: newAddState });
    case "REMOVE_FILTER":
      let currentRemoveFilter =
        state.filters[action.name] && state.filters[action.name].length
          ? state.filters[action.name]
          : [];
      currentRemoveFilter = _.pull(currentRemoveFilter, action.value);

      const newRemoveState = Object.assign({}, state.filters, {
        [action.name]: currentRemoveFilter
      });
      return Object.assign({}, state, { filters: newRemoveState });
    case "CLEAR_FILTERS":
      return Object.assign({}, state, { filters: {} });
    default:
      return state;
  }
};

const pagination = (state = { page: 1 }, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return Object.assign({}, state, { page: action.page });
    default:
      return state;
  }
};

const content = (state = { entries: [] }, action) => {
  switch (action.type) {
    case "SET_CONTENT":
      return Object.assign({}, state, { entries: action.entries });
    default:
      return state;
  }
};

// const reducers = combineReducers({
//   filters,
//   pagination,
//   content
// });


const reducers = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  filters,
  pagination,
  content
});
export default reducers;
