import React from 'react';
import { connect } from 'react-redux';
import { fetchCharacters, retrivedObj, APP_CONSTANTS  } from '../actions';

class DisplayCharacters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search : "",
          sortType : 'asc'
        }
        this.onSort = this.onSort.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
  componentDidMount() {
    this.props.fetchCharacters();
    console.log('this.props.fetchCharacters();====', this.props.fetchCharacters());
  }

  

  onSort(sortType){
    this.setState({sortType});
  }

  handleInputChange(event) {
    this.setState({search: event.target.value});
  }

  renderApiData(tile) {
    return(
        <React.Fragment key={tile.id}>
            <div className="btmspace-3">
                <div className="bgded overlay">
                    <img src={tile.image} alt={tile.name}/>
                    <div className="tile-heading">
                        <h2>{tile.name}</h2>
                        <p>
                            <span>id :{tile.id} - created {tile.created} ago</span>
                        </p>
                    </div>
                    <div className="tile-info">
                        <p>
                            <span>Status</span>
                            <span>{tile.status}</span>
                        </p>
                        <p>
                            <span>Species</span>
                            <span>{tile.species}</span>
                        </p>
                        <p>
                            <span>Gender</span>
                            <span>{tile.gender}</span>
                        </p>
                        <p>
                            <span>Origin</span>
                            <span>Post-Apocalyptic {tile.origin.name}</span>
                        </p>
                        <p>
                            <span>Last Location</span>
                            <span>Post-Apocalyptic {tile.origin.name}</span>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
  }

  render() {
    console.log('apiData in dc==', retrivedObj);
    const { search, sortType } = this.state;
    const searchResults = retrivedObj.filter( item => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    const sortedResults = retrivedObj.sort((a,b) => {
        const isReversed = (sortType === 'asc') ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
    });
    return (
        <React.Fragment>
            <div className="ui two column padded grid">
                <div className="column">
                    <div className="ui segment">
                        <form className="ui form">
                            <label htmlFor="search">{APP_CONSTANTS.searchLabel}</label><br/>
                            <input label="Search" placeholder={APP_CONSTANTS.enterName} onChange={this.handleInputChange}/>
                        </form>
                    </div>
                </div>
                <div className="column">
                    <div className="ui segment">
                        <label htmlFor="search">{APP_CONSTANTS.sortLabel}</label><br/>
                        <select className="ui dropdown" id="myList" onChange={(e) => this.onSort(e.target.value)}>
                            <option value="asc">{APP_CONSTANTS.ascending}</option>
                            <option value="desc">{APP_CONSTANTS.descending}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="ui four column doubling stackable grid nospace">
                {
                    (search !== '') ?
                    searchResults.map(tile => {
                    return this.renderApiData(tile);
                    }) :
                    sortedResults.map(tile => {
                    return this.renderApiData(tile);
                    })
                }
            </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { 
    characters: state.characters 
  };
};

export default connect(
  mapStateToProps,
  { fetchCharacters }
)(DisplayCharacters);
