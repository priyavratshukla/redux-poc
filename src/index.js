import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppContainer from './components/App';
import reducers from './reducers';
import './Style/App.css';

const store = createStore(reducers, applyMiddleware(thunk));
console.log('store', store.getState());
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);