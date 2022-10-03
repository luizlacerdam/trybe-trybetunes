import React from 'react';

class Login extends React.Component {
  state = {
    desabilitado: false,
  };

  onButtonClick = () => {
  };

  render() {
    const { desabilitado } = this.state;
    return (
      <div data-testid="page-login">
        <input data-testid="login-name-input" type="text" />
        <button
          disabled={ desabilitado }
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

export default Login;
