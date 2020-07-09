import _ from 'lodash';
import React from 'react';
import FilterBubblesContainer from './FilterBubbles';
import DisplayCharacters from './DisplayCharatcters';
import FiltersContainer from './Filters';

const AppContainer = class Body extends React.Component {  
    render() {
      let apiData = localStorage.getItem("fetchedcharacters");
      let retrivedObj = JSON.parse(apiData);
      console.log('apidata in body===', retrivedObj);
      return (
        <section className="body">
          <header className="body__header">
            <h2 className="body__header__title">Selected Filters</h2>
          </header>
          <main className="app">
            <FiltersContainer />
            <FilterBubblesContainer />
            <DisplayCharacters />
          </main>
        </section>
      );
    }
  };
  
 export default AppContainer;