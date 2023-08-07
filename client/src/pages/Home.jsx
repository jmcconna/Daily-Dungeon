import { useState } from 'react';
import styled from 'styled-components';
import SignUpForm from './SignupForm';
import Login from './Login';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Home = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleLoginClick = () => {
    setIsLoginMode(true);
    setIsSignupMode(false);
  };

  const handleSignupClick = () => {
    setIsSignupMode(true);
    setIsLoginMode(false);
  };

  const handleCloseForms = () => {
    setIsLoginMode(false);
    setIsSignupMode(false);
  };

  return (
    <Container>
      <h1>Prepare for Adventure!</h1>
      {!isLoginMode && !isSignupMode && (
        <div className='stack'>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Signup</button>
          <Link to={{ pathname: '/introduction' }}>
            <button>Continue as Guest</button>
          </Link>
          
        </div>
      )}
      {isLoginMode && (
        <Login onSignupClick={handleSignupClick} onClose={handleCloseForms} />
      )}
      {isSignupMode && (
        <SignUpForm onLoginClick={handleLoginClick} onClose={handleCloseForms} />
      )}
    </Container>
  );
}

export default Home;
