import _ from 'lodash';
import React from 'react';
import { addFilter, removeFilter, setPage, entryAttr  } from '../actions';
import { connect } from 'react-redux';

const Filters = class Filters extends React.Component {
    updateFilter(name, e) {
      if (e.target.checked) {
        this.props.addFilter(name, e.target.value);
      } else {
        this.props.removeFilter(name, e.target.value);
      }
      
      this.props.resetPage();

    }
    filterResults(filters) {
      let resArr = document.querySelectorAll(".services li");
      let hiddenArr = [];
      if (!resArr || resArr.length <= 0) {
        return;
      }
      for (let i = 0; i < resArr.length; i++) {
        let el = resArr[i];
        if (filters.filterParam.length > 0) {
          let isHidden = true;
          for (let j = 0; j < filters.filterParam.length; j++) {
            let filter = filters.filterParam[j];
            if (el.children[0].textContent.toLocaleLowerCase().match(filter)) {
              isHidden = false;
              break;
            }
          }
          if (isHidden) {
            hiddenArr.push(el);
          }
        }
      }
      for (let i = 0; i < resArr.length; i++) {
        resArr[i].style.display = "inline-block";
      }
      if (hiddenArr.length <= 0) {
        return;
      }
      for (let i = 0; i < hiddenArr.length; i++) {
        hiddenArr[i].style.display = "none";
      }
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

