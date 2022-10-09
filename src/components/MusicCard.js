import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
      favorites: response.map((song) => song.trackId),
      loading: false,
    });
  };

  handleInputOnChange = async (event) => {
    const { id } = event.target;
    const { musics } = this.props;
    this.setState({
      loading: true,
    });
    const track = musics.filter((music) => music.trackId === parseInt(id, 10));
    await addSong(track[0]);
    this.setState({ loading: false });
  };

  handleClick = (event) => {
    const { favorites } = this.state;
    const { id } = event.target;
    this.setState({ favorites: [...favorites, id] });
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
                    favorites.find((elemento) => parseInt(elemento, 10) === track.trackId)
                  }
                  onChange={ this.handleInputOnChange }
                  onClick={ this.handleClick }
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
  musics: PropTypes.arrayOf().isRequired,
};

export default MusicCard;
