import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { setPage, removeFilter, clearFilters, APP_CONSTANTS  } from '../actions';

const FilterBubbles = class FilterBubbles extends React.Component {
    render() {
      const allFilters = Object.keys(
        this.props.filters
      ).reduce((filters, filterKey) => {
        if (this.props.filters[filterKey]) {
          this.props.filters[filterKey].forEach(filter => {
            filters.push({
              name: filterKey,
              value: filter
            });
          });
        }
        localStorage.setItem('filterLabels', JSON.stringify(filters));
        return filters;
      }, []);
      return (
        <React.Fragment>
          {allFilters.length !== 0 ? <h2>{APP_CONSTANTS.selectedFilters}</h2> : ''}
          <ul className="filter-bubbles">
          {allFilters.map(filter => {
            const filterId = _.snakeCase(`filter-${filter.name}-${filter.value}`);
            return (
              <li key={filterId}>
                {filter.value} &nbsp;
                <button
                  type="button"
                  onClick={e => {
                    this.props.removeFilter(filter.name, filter.value);
                  }}
                >
                  x
                </button>
              </li>
            );
          })}
          {!!allFilters.length && (
            <li className="filters-bubbles__clear-all">
              <button type="button" onClick={this.props.clearFilters}>
                Clear All
              </button>
            </li>
          )}
        </ul>
        </React.Fragment>
        
      );
    }
  };
  
  const FilterBubbleMapStateToProps = state => {
    return {
      filters: state.filters.filters
    };
  };
  
  const FilterBubbleMapDispatchToProps = dispatch => {
    return {
      removeFilter: (name, value) => {
        dispatch(setPage(1));
        dispatch(removeFilter(name, value));
      },
      clearFilters: () => {
        dispatch(setPage(1));
        dispatch(clearFilters());
      }
    };
  };
  
  const FilterBubblesContainer = connect(
    FilterBubbleMapStateToProps,
    FilterBubbleMapDispatchToProps
  )(FilterBubbles);

  export default FilterBubblesContainer;