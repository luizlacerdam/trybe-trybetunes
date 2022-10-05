import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  };

  componentDidMount() {
    this.updateUser();
  }

  updateUser = () => {
    getUser().then((data) => this.setState({
      user: data.name,
      loading: false,
    }));
  };

  render() {
    const { user, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <NavLink data-testid="link-to-search" to="/search" activeClassName="selected">
          Search
        </NavLink>
        <NavLink
          data-testid="link-to-favorites"
          to="/favorites"
          activeClassName="selected"
        >
          Favorites
        </NavLink>
        <NavLink
          data-testid="link-to-profile"
          to="/profile"
          activeClassName="selected"
        >
          Profile
        </NavLink>
        <div data-testid="header-user-name">
          { user }
        </div>
      </header>
    );
  }
}

export default Header;
