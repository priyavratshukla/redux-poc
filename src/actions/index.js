import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

/**
 * 5000
 * Pre: 1336ms
 * Post : 144ms
 **/
const DATA_ENTRIES = 5000;
const ENTRIES_PER_PAGE = 100;

// const { createStore, combineReducers } = Redux;
// const { Provider, connect } = ReactRedux;

const entryAttr = {
  name: [
    "Han Solo",
    "Darth Vader",
    "Luke Skywalker",
    "Princess Leia",
    "Chewie",
    "Lando Calrissian",
    "Boba Fett",
    "Yoda",
    "R2D2",
    "Kylo Ren",
    "Rey",
    "Fin",
    "Poe Dameron",
    "Obi-Wan Kenobi"
  ],
  powers: ["Push", "Pull", "Mind Tricks", "Lighning", "Choke", "Drain"],
  color: [
    "Red",
    "Blue",
    "Green",
    "Purple",
    "Yellow",
    "Orange",
    "White",
    "Black"
  ],
  fortune: [100, 200, 300, 400, 500, 600],
  home: [
    "Crait",
    "Tatooine",
    "Hoth",
    "Endor",
    "Jakku",
    "Death Star",
    "Cloud City"
  ],
  transportation: [
    "A-Wing",
    "X-Wing",
    "Y-Wing",
    "Tie Fighter",
    "Star Destroyer",
    "Millenium Falcon"
  ]
};

export const addFilter = (name, value) => {
  return {
    type: "ADD_FILTER",
    name,
    value
  };
};

export const removeFilter = (name, value) => {
  return {
    type: "REMOVE_FILTER",
    name,
    value
  };
};

export const clearFilters = () => {
  return {
    type: "CLEAR_FILTERS"
  };
};

export const setPage = page => {
  return {
    type: "SET_PAGE",
    page
  };
};

export const setContent = entries => {
  return {
    type: "SET_CONTENT",
    entries
  };
};


