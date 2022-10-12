import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favorites: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    this.setState({
      loading: true,
    });
    const data = await getFavoriteSongs();
    this.setState({
      favorites: data,
      loading: false,
    });
  };

  handleInputOnChange = async (event) => {
    const { id, checked } = event.target;
    const { favorites } = this.state;
    const track = favorites.filter((music) => music.trackId === parseInt(id, 10));
    if (!checked) {
      this.setState({ loading: true });
      const newArr = favorites.filter((song) => song.trackId !== parseInt(id, 10));
      await removeSong(track[0]);
      return this.setState({
        loading: false,
        favorites: newArr,
      });
    }
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" />
        { loading && <div>Músicas favoritas:</div>}
        { loading ? <Loading />
          : favorites.map((track) => (
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
      </>
    );
  }
}

export default Favorites;
