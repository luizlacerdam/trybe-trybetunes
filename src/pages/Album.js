import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    albumNameAndArtist: [],
  };

  componentDidMount() {
    this.fetchGetMusics();
  }

  fetchGetMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const albumMusics = await getMusics(id);
    this.setState({
      albumNameAndArtist: albumMusics[0],
      musics: albumMusics.slice(1),
    });
  };

  render() {
    const { albumNameAndArtist, musics } = this.state;
    console.log(albumNameAndArtist);
    return (
      <>
        <Header />
        <div data-testid="page-album" />
        <div data-testid="artist-name">{ albumNameAndArtist.artistName }</div>
        <div
          data-testid="album-name"
        >
          { albumNameAndArtist.collectionName }
        </div>
        <MusicCard musics={ musics } />
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {},
};

export default Album;
