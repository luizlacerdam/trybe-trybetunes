import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
        <div data-testid="header-user-name">
          { user }
        </div>
      </header>
    );
  }
}

export default Header;
