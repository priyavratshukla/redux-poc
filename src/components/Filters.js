import _ from 'lodash';
import React from 'react';
import { addFilter, removeFilter, setPage, entryAttr  } from '../actions';
import { connect } from 'react-redux';

const Filters = class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.onFilter = this.onFilter.bind(this);
    this.getFilteredArr = this.getFilteredArr.bind(this);
  }

  onFilter(filters){
    // let filterParam = JSON.parse(localStorage.getItem("filterLabels"));
    // console.log('filters===', filterParam);
    // let filters = filterParam.map(filter =>{
    //   console.log('filter', filter.value);
    //   return filter.value;
    // })
    // console.log('filters', filters);
    let resArr = document.querySelectorAll("div.nospace .btmspace-3");
    
      let hiddenArr = [];
      if (!resArr || resArr.length <= 0) {
        return;
      }
      for (let i = 0; i < resArr.length; i++) {
        let el = resArr[i];
        if (filters.length > 0) {
          let isHidden = true;
          for (let j = 0; j < filters.length; j++) {
            let filter = filters[j];
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

  getFilteredArr(checkboxes) {
    let elemArr = [];
    if (checkboxes && checkboxes.length > 0) {
      for (let i = 0; i < checkboxes.length; i++) {
        let checkBoxArr = checkboxes[i];
        if (checkBoxArr.checked) {
          elemArr.push(checkBoxArr.getAttribute("name"));
        }
      }
    }
    return elemArr;
  }

  updateFilter(name, e) {
      if (e.target.checked) {
        this.props.addFilter(name, e.target.value);
        // let filterParam = JSON.parse(localStorage.getItem("filterLabels"));
        // let filterBubbles = document.querySelectorAll(".filter-bubbles");
        // console.log('filters===', filterParam);
        // console.log('filterBubbles===', filterBubbles);
      } else {
        this.props.removeFilter(name, e.target.value);
      }
      this.props.resetPage();
    }
    render() {
      let filterParam = JSON.parse(localStorage.getItem("filterLabels"));
      console.log('filters===', filterParam);
      return (
        <React.Fragment>
          <div className="column">
            <div className="ui segment">
              <h2>Filters</h2>
              <div>
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
                                onChange={
                                  e => { this.updateFilter(attr, e) }
                                  //this.allFilter
                                }
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
          </div>
        </React.Fragment>
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

