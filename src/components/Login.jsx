import PropTypes from 'prop-types';
import { BsGoogle } from 'react-icons/bs';

import Api from '../Api';
import './Login.css';

export default function Login({ onReceive }) {
  const handleGoogleLogin = async () => {
    const result = await Api.googlePopup();

    if (result) {
      onReceive(result.user);
    } else {
      window.alert('Erro de autenticação!');
    }
  };

  return (
    <div className="login">
      <button onClick={handleGoogleLogin}>
        <span>Entre com o Google</span>
        <BsGoogle />
      </button>
    </div>
  );
}

Login.propTypes = {
  onReceive: PropTypes.func.isRequired,
};
