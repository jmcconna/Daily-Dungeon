import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../utils/mutations';

const SignUpForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({ variables: { username, email, password } });
      console.log('New user created:', data.createUser);
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading} to="/characterselect">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <a href="/" onClick={handleBackClick}>Back</a>
    </div>
  );
};

SignUpForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignUpForm;
