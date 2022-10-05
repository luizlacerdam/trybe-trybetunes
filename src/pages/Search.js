import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search" />
      </>
    );
  }
}

export default Search;
