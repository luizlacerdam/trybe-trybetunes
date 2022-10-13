import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    newEmail: '',
    newName: '',
    newDesc: '',
    newImg: '',
    disabled: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({ loading: true }, () => getUser()
      .then((data) => this.setState({
        newEmail: data.email,
        newName: data.name,
        newDesc: data.description,
        newImg: data.image,
        loading: false,
      })));
  };

  handleInputOnChange = (event) => {
    const { id, value } = event.target;
    const { newName, newEmail, newDesc, newImg } = this.state;
    this.setState({
      [id]: value,
      disabled: (
        newEmail.length > 0
        && newName.length > 0
        && newDesc.length > 0
        && newImg.length > 0
      ),
    });
  };

  updateProfile = () => {
    const { history } = this.props;
    const { newName, newEmail, newDesc, newImg } = this.state;
    this.setState({ loading: true });
    updateUser({
      name: newName,
      email: newEmail,
      image: newImg,
      description: newDesc,
    }).then(() => history.push('/profile'));
  };

  render() {
    const { loading,
      newName, newEmail, newDesc, newImg, disabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" />
        { loading ? <Loading />
          : (
            <div>
              <img src={ newImg } alt={ newName } />
              <label htmlFor="newImg">
                Img:
                <input
                  type="text"
                  id="newImg"
                  value={ newImg }
                  data-testid="edit-input-image"
                  onChange={ this.handleInputOnChange }
                />
              </label>
              <label htmlFor="newName">
                Nome:
                <input
                  type="text"
                  id="newName"
                  value={ newName }
                  data-testid="edit-input-name"
                  onChange={ this.handleInputOnChange }
                />
              </label>
              <label htmlFor="newEmail">
                E-mail:
                <input
                  type="email"
                  id="newEmail"
                  value={ newEmail }
                  data-testid="edit-input-email"
                  onChange={ this.handleInputOnChange }
                />
              </label>
              <label htmlFor="newDesc">
                Descrição:
                <textarea
                  id="newDesc"
                  cols="30"
                  rows="10"
                  value={ newDesc }
                  data-testid="edit-input-description"
                  onChange={ this.handleInputOnChange }
                />
              </label>
              <button
                type="button"
                onClick={ this.updateProfile }
                id="salvar"
                data-testid="edit-button-save"
                disabled={ !disabled }
              >
                Salvar

              </button>
            </div>
          )}
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProfileEdit;
