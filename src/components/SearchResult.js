import PropTypes from 'prop-types';
import React from 'react';
import AlbumCard from './AlbumCard';

class SearchResult extends React.Component {
  render() {
    const { returnInputAlbumsAPI, artistName, isSearch } = this.props;
    return (
      <section>
        <h1>
          {
            isSearch
            && returnInputAlbumsAPI.length > 0
            && (`Resultado de álbuns de: ${artistName}`)
          }
          {
            isSearch
            && returnInputAlbumsAPI.length === 0
            && ('Nenhum álbum foi encontrado')
          }
        </h1>
        {
          returnInputAlbumsAPI.map((album, index) => (
            <AlbumCard album={ album } key={ index } />
          ))
        }
      </section>
    );
  }
}

SearchResult.propTypes = {
  returnInputAlbumsAPI: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  artistName: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
};

export default SearchResult;
