import React from 'react';
import { connect } from 'react-redux';
import { fetchCharacters, retrivedObj  } from '../actions';

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
        <div className="item bgded overlay" key={tile.id}>
          <div className="content">
                <div className="description">
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
        </div>
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
            <form className="search-form col-xs-12 col-sm-6">
                <label htmlFor="search">Search by name:</label><br/>
                <input label="Search" onChange={this.handleInputChange}/>
            </form>
            <div className="col-xs-12 col-sm-6">
                <select className="col-xs-12 col-sm-3" id="myList" onChange={(e) => this.onSort(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                </select>
            </div>
            <div className="ui relaxed divided list">
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
