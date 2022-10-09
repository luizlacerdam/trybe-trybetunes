import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        {musics.map((track) => (
          <div key={ track.trackId }>
            <p>{track.trackName}</p>
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
