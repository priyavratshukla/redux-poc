import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import FilterBubblesContainer from '../components/FilterBubbles';
import PaginationContainer from '../components/Pagination';

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
 * Components - Body
 **/
const Body = class Body extends React.Component {
    filterEntries() {
      if (_.isEmpty(this.props.filters)) {
        return this.props.entries;
      }
  
      return this.props.entries.filter(entry => {
        let matchFilters = true;
        Object.keys(this.props.filters).forEach(filterKey => {
          if (this.props.filters[filterKey].length) {
            matchFilters = this.props.filters[filterKey].includes(
              entry[filterKey].toString()
            )
              ? matchFilters
              : false;
          }
        });
        return matchFilters;
      });
    }
  
    render() {
      const paginationOffset = (this.props.page - 1) * ENTRIES_PER_PAGE;
      const entries = this.filterEntries();
      const paginatedEntries = entries.slice(
        paginationOffset,
        paginationOffset + ENTRIES_PER_PAGE
      );
  
      return (
        <section className="body">
          <header className="body__header">
            <h2 className="body__header__title">Entries ({paginationOffset + 1}-{paginationOffset + paginatedEntries.length} of {entries.length})</h2>
          </header>
          <FilterBubblesContainer />
          <table>
            <thead>
              <tr>
                {Object.keys(entryAttr).map((attr, i) => (
                  <th key={`heading-${i}`}>{attr}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedEntries.map(entry => {
                return (
                  <tr key={`row-${entry.id}`}>
                    {Object.keys(entryAttr).map((attr, k) => (
                      <td key={`col-${entry.id}-${k}`}>{entry[attr]}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PaginationContainer entries={entries} />
        </section>
      );
    }
  };
  
  const BodyMapStateToProp = state => {
    return {
      filters: state.filters.filters,
      page: state.pagination.page,
      entries: state.content.entries
    };
  };
  
 const BodyContainer = connect(BodyMapStateToProp)(Body);
 export default BodyContainer;