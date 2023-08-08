import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import '../assets/css/UserForm.css';

const SignUpForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({
        variables: { username, email, password },
      });

      console.log('New user created:', data.createUser);
      Auth.login(data.createUser);
      navigate('/charactercreate');
    } catch (error) {
      console.error('Error creating user:', error.message);
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
      <h2 className='center'>Sign Up</h2>
      <form onSubmit={handleSignUp} className="stack">
        <div className="stack">
          <label htmlFor="username">Username:</label>
          <input
            style={{ border: '1px solid red', borderRadius: '5px' }}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="stack">
          <label htmlFor="email">Email:</label>
          <input
            style={{ border: '1px solid red', borderRadius: '5px' }}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="stack">
          <label htmlFor="password">Password:</label>
          <input
            style={{ border: '1px solid red', borderRadius: '5px' }}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='center'
            style={{
              fontSize: '60%',
              fontStyle: 'italic',
              maxInlineSize: '50ch',
              textAlign: 'center',
            }}>
            Password must be at least 8 characters and contain at least one
            number and one special character.
          </span>
        </div>

        <button type="submit" disabled={loading}>
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <a href="/" onClick={handleBackClick} style={{ color: 'yellow' }}>
        Back
      </a>
    </div>
  );
};

SignUpForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignUpForm;
