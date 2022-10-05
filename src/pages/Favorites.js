import React from 'react';
import Header from './Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites" />
      </>
    );
  }
}

export default Favorites;
