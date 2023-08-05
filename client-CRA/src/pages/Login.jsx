import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../utils/mutations';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({ variables: { email, password } });
      console.log('Logged in user:', data.loginUser);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='stack'>
        <div className='stack'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='stack'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading} to="/characterselect">
          Login
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <a href="/" onClick={handleBackClick}>Back</a>
    </div>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Login;
