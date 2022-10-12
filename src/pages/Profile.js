import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    userData: [],
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({ loading: true }, () => getUser()
      .then((data) => this.setState({
        userData: data,
        loading: false,
      })));
  };

  render() {
    const { loading, userData } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile" />
        { loading ? <Loading />
          : (
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
              <img
                data-testid="profile-image"
                src={ userData.image }
                alt={ `Foto de ${userData.name}` }
              />
              <div>{userData.name}</div>
              <div>{userData.email}</div>
              <div>{userData.description}</div>
            </div>
          )}

      </>
    );
  }
}

export default Profile;
