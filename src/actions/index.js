import fetchCharactersApi from '../apis/fetchCharacters';

let apiData = localStorage.getItem("fetchedcharacters");
export const retrivedObj = JSON.parse(apiData);
console.log('from localstorage===', retrivedObj);

export const entryAttr = {
  gender: ['Male', 'Female'],
  species: ['Human', 'Alien'],
  origin: ["Earth (C-137)", "Earth (Replacement Dimension)", "Abadango", "unknown", ]
}

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


