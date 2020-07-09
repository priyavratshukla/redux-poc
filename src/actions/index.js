import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import fetchCharactersApi from '../apis/fetchCharacters';

let apiData = localStorage.getItem("fetchedcharacters");
export const retrivedObj = JSON.parse(apiData);
console.log('from localstorage===', retrivedObj);





export const DATA_ENTRIES = 5000;
export const ENTRIES_PER_PAGE = 100;
export const entryAttr = {
  gender: ['Male', 'Female'],
  species: ['Human', 'Alien'],
  origin: ["Earth (C-137)", "Earth (Replacement Dimension)", "Abadango", "unknown", ]
}
// export const entryAttr = {
//   name: [
//     "Han Solo",
//     "Darth Vader",
//     "Luke Skywalker",
//     "Princess Leia",
//     "Chewie",
//     "Lando Calrissian",
//     "Boba Fett",
//     "Yoda",
//     "R2D2",
//     "Kylo Ren",
//     "Rey",
//     "Fin",
//     "Poe Dameron",
//     "Obi-Wan Kenobi"
//   ],
//   powers: ["Push", "Pull", "Mind Tricks", "Lighning", "Choke", "Drain"],
//   color: [
//     "Red",
//     "Blue",
//     "Green",
//     "Purple",
//     "Yellow",
//     "Orange",
//     "White",
//     "Black"
//   ],
//   fortune: [100, 200, 300, 400, 500, 600],
//   home: [
//     "Crait",
//     "Tatooine",
//     "Hoth",
//     "Endor",
//     "Jakku",
//     "Death Star",
//     "Cloud City"
//   ],
//   transportation: [
//     "A-Wing",
//     "X-Wing",
//     "Y-Wing",
//     "Tie Fighter",
//     "Star Destroyer",
//     "Millenium Falcon"
//   ]
// };


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

export const fetchCharacters = () => async dispatch => {
  const response = await fetchCharactersApi.get('/');
  console.log('FETCH_CHARACTERS===', response.data.results);
  localStorage.setItem('fetchedcharacters', JSON.stringify(response.data.results));
  dispatch({ type: 'FETCH_CHARACTERS', payload: response.data.results });
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


