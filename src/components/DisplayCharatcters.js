import React from 'react';
import { connect } from 'react-redux';
import { fetchCharacters  } from '../actions';

class DisplayCharacters extends React.Component {
  componentDidMount() {
    this.props.fetchCharacters();
    console.log('this.props.fetchCharacters();====', this.props.fetchCharacters());
  }

  renderList() {
    return this.props.characters.map(tile => {
      return (
        <div className="item bgded overlay" key={tile.id}>
          <div className="content">
                <div className="description">
                <img src={tile.image}/>
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
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
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
