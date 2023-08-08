import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import '../assets/css/UserForm.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password);
      const { data } = await loginUser({ variables: { email, password } });
      console.log('Logged in user:', data.loginUser);
        // token / user passed back
        const DD_session = data.loginUser
        localStorage.setItem('DD_session', JSON.stringify(DD_session))
      navigate('/characterselect');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <div
      style={{
        color: 'yellow',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '1em',
      }}>
      <h2 className='center'>Login</h2>
      <form onSubmit={handleLogin} className='stack'>
        <div className='stack'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: '1px solid red', borderRadius: '5px' }}
          />
        </div>
        <div className='stack'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: '1px solid red', borderRadius: '5px' }}
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <a href="/" onClick={handleBackClick} style={{ color: 'yellow' }}>
        Back
      </a>
    </div>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Login;