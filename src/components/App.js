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
        <React.Fragment>
          <div className="ui celled grid">
            <div className="row">
              <div className="three wide column stackable grid container">
                <div className="column">
                  <div className="ui segment"><FiltersContainer /></div>
                </div>
              </div>
              <div id="result-wrapper" className="thirteen wide column stackable grid container">
                <FilterBubblesContainer />
                <DisplayCharacters />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  };
  
 export default AppContainer;