import { useState } from 'react';
import styled from 'styled-components';
import SignUpForm from './SignupForm';

  return (
    <Container>
      <h1>Prepare for Adventure!</h1>
      {!isLoginMode && !isSignupMode && (
        <>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Signup</button>
          <button>Continue as Guest</button>
        </>
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
