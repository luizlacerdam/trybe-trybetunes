import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <section key={ album.collectionId }>
        <div>
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <NavLink
            data-testid={ `link-to-album-${album.collectionId}` }
            to={ `/album/${album.collectionId}` }
            activeClassName="selected"
          >
            <p>{album.collectionName}</p>
          </NavLink>
          <p>{album.artistName}</p>
        </div>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default AlbumCard;
