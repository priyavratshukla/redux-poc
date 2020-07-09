import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { addFilter, removeFilter, setPage  } from '../actions';
import reducers from '../reducers/index';
import { connect } from 'react-redux';


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
 * Components - Filters
 **/
const Filters = class Filters extends React.Component {
    updateFilter(name, e) {
      if (e.target.checked) {
        this.props.addFilter(name, e.target.value);
      } else {
        this.props.removeFilter(name, e.target.value);
      }
      
      this.props.resetPage();
    }
  
    render() {
      return (
        <div className="filters">
          <header className="filters__header">
            <h2 className="filters__header__title">Filters</h2>
          </header>
          <div className="filters__inner">
            {Object.keys(entryAttr)
              .filter(attr => attr !== "name")
              .map((attr, i) => {
                return (
                  <div key={`filter-${i}`} className="filters__filter">
                    <h3 className="filters__filter__title">{attr}</h3>
                    <ul>
                      {entryAttr[attr].map((attrValue, attrValueKey) => {
                        const inputId = _.snakeCase(attr + attrValue);
                        const checked = this.props.filters[attr]
                          ? this.props.filters[attr].includes(attrValue.toString())
                          : false;
                        return (
                          <li key={`${attrValue}-${attrValueKey}`}>
                            <input
                              type="checkbox"
                              id={inputId}
                              value={attrValue}
                              name={attrValue}
                              checked={checked}
                              onChange={e => {
                                this.updateFilter(attr, e);
                              }}
                            />
                            <label htmlFor={inputId}>{attrValue}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
  };
  
  const FiltersMapStateToProps = state => {
    return {
      filters: state.filters.filters
    };
  };
  
  const FiltersMapDispatchToProps = dispatch => {
    return {
      addFilter: (name, value) => {
        dispatch(addFilter(name, value));
      },
      removeFilter: (name, value) => {
        dispatch(removeFilter(name, value));
      },
      resetPage: () => {
        dispatch(setPage(1));
      }
    };
  };
  
  const FiltersContainer = connect(
    FiltersMapStateToProps,
    FiltersMapDispatchToProps
  )(Filters);

  export default FiltersContainer;

