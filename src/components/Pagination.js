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
 * Components - Pagination
 **/
const Pagination = class Pagination extends React.Component {
    render() {
      if (this.props.entries.length <= ENTRIES_PER_PAGE) {
        return (null);
      }
      
      const pages = this.props.entries.length / ENTRIES_PER_PAGE + 1;
      const displayPages = pages > 10 ? 10 : pages;
      const displayMin = pages > 10
        ? this.props.page - 5 < 1
          ? 1
          : this.props.page - 5
        : 1;
      const displayMax = pages > 10
        ? this.props.page + 5 > pages
          ? pages
          : this.props.page + 5 < displayMin + 10
            ? displayMin + 10
            : this.props.page + 5
        : displayPages;
  
      return (
        <ul className="pagination">
          <li>
            <button
              type="button"
              className='--prev'
              onClick={e => {
                this.props.setPage(this.props.page - 1);
              }}
              disabled={this.props.page - 1 <= 0}
              >
              Prev
            </button>
          </li>
          {_.range(
            displayMin,
            displayMax
          ).map((page, i) => {
            return (
              <li>
                <button
                  type="button"
                  className={`${page === this.props.page ? "--active" : ""}`}
                  onClick={e => {
                    this.props.setPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              className='--next'
              onClick={e => {
                this.props.setPage(this.props.page + 1);
              }}
              disabled={this.props.page + 1 >= this.props.entries.length / ENTRIES_PER_PAGE}
              >
              Next
            </button>
          </li>
        </ul>
      );
    }
  };
  
  const PaginationMapStateToProps = state => {
    return {
      page: state.pagination.page
    };
  };
  
  const PaginationMapDispatchToProps = dispatch => {
    return {
      setPage: page => {
        dispatch(setPage(page));
      }
    };
  };
  
  const PaginationContainer = connect(
    PaginationMapStateToProps,
    PaginationMapDispatchToProps
  )(Pagination);

  export default PaginationContainer; 