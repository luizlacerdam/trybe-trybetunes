import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorites: [],
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({
      loading: true,
    });
    const response = await getFavoriteSongs();
    this.setState({
      favorites: response,
      loading: false,
    });
  };

  handleInputOnChange = async (event) => {
    const { id, checked } = event.target;
    const { musics } = this.props;
    const { favorites } = this.state;
    const track = musics.filter((music) => music.trackId === parseInt(id, 10));
    if (!checked) {
      this.setState({ loading: true });
      const newArr = favorites.filter((song) => song.trackId !== parseInt(id, 10));
      await removeSong(track[0]);
      return this.setState({
        loading: false,
        favorites: newArr,
      });
    }
    this.setState({
      loading: true,
      favorites: [...favorites, musics
        .filter((musica) => musica.trackId === parseInt(id, 10))[0]],
    });
    await addSong(track[0]);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { musics } = this.props;
    const { loading, favorites } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : musics.map((track) => (
            <div key={ track.trackId }>
              <p>{track.trackName}</p>
              <label htmlFor={ track.trackId }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${track.trackId}` }
                  type="checkbox"
                  id={ track.trackId }
                  checked={
                    favorites.find((elemento) => elemento.trackId === track.trackId)
                  }
                  onChange={ this.handleInputOnChange }
                />
              </label>
              <audio
                data-testid="audio-component"
                src={ track.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MusicCard;
