import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    inputValue: '',
  };

  handleInputOnChange = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputOnChange }
            value={ inputValue }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ (inputValue.length < 2) }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
