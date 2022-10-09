import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SearchResult from '../components/SearchResult';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputValue: '',
    returnInputAlbumsAPI: [],
    loading: false,
    artistName: '',
    isSearch: false,
  };

  handleInputOnChange = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  onButtonClickSearchAlbum = () => {
    const { inputValue } = this.state;
    this.setState({
      loading: true,
      artistName: inputValue,
    }, () => searchAlbumsAPI(inputValue).then((data) => this.setState({
      returnInputAlbumsAPI: data,
      inputValue: '',
      loading: false,
      isSearch: true,
    })));
  };

  render() {
    const { inputValue,
      returnInputAlbumsAPI, loading, artistName, isSearch } = this.state;
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
            onClick={ this.onButtonClickSearchAlbum }
          >
            Pesquisar
          </button>
          <section>
            {
              loading
                ? <Loading />
                : (
                  <SearchResult
                    returnInputAlbumsAPI={ returnInputAlbumsAPI }
                    artistName={ artistName }
                    isSearch={ isSearch }
                  />)
            }
          </section>
        </div>
      </>
    );
  }
}

export default Search;
