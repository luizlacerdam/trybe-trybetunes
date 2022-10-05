import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    userName: '',
    desabilitado: false,
    loading: false,
  };

  // onButtonClick = async (event) => {
  //   const { history } = this.props;
  //   const { userName } = this.state;
  //   this.setState({
  //     loading: true,
  //   });
  //   const request = await createUser({ name: userName });
  //   console.log(request);
  //   this.setState({
  //     loading: false,
  //   });
  //   history.push('/search');
  // };

  onButtonClick = () => {
    const { history } = this.props;
    const { userName } = this.state;
    this.setState({ loading: true }, () => createUser({
      name: userName,
    }).then(() => this.setState({ loading: false }, () => history.push('/search'))));
  };

  onInputChange = (event) => {
    const { value } = event.target;
    const MIN_LENGTH = 3;
    this.setState({
      desabilitado: (value.length >= MIN_LENGTH),
      userName: value,
    });
  };

  render() {
    const { desabilitado, loading, userName } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <input
          onChange={ this.onInputChange }
          data-testid="login-name-input"
          value={ userName }
          type="text"
        />
        <button
          disabled={ !desabilitado }
          type="button"
          data-testid="login-submit-button"
          onClick={ this.onButtonClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
