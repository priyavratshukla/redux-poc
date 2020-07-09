import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import FiltersContainer from '../components/Filters';
import BodyContainer from '../components/Body';
import { setContent } from '../actions';
import reducers from '../reducers';
import "../Style/App.css";
// import PostList from './PostList';

// const App = () => {
//   return (
//     <div className="ui container">
//       <PostList />
//     </div>
//   );
// };

// export default App;

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

/**
 * Components - App
 **/
const App = class App extends React.Component {
  componentWillMount() {
    this.props.setContent(this.getEntries());
  }

  getEntries() {
    const entries = [];
    for (let i = 0; i < DATA_ENTRIES; i++) {
      const entry = { id: i };

      Object.keys(entryAttr).forEach(attr => {
        entry[attr] =
          entryAttr[attr][Math.floor(Math.random() * entryAttr[attr].length)];
      });

      entries.push(entry);
    }
    return entries;
  }

  render() {
    return (
      <main className="app">
        <FiltersContainer />
        <BodyContainer />
      </main>
    );
  }
};

const AppMapStateToProps = state => {
  return {
    entries: state.content.entries
  };
};

const AppMapDispatchToProps = dispatch => {
  return {
    setContent: entries => {
      dispatch(setContent(entries));
    }
  };
};

const AppContainer = connect(AppMapStateToProps, AppMapDispatchToProps)(App);

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);


// const store = createStore(reducers, applyMiddleware(thunk));
// console.log('store', store.getState());
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.querySelector('#root')
// );