import SignUpForm from './SignupForm';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Prepare for Adventure!</h1>
      <SignUpForm />
      <Link to={{ pathname: '/charactercreate'}}>
        <button>Begin...</button>
      </Link>
    </div>
  );
}

export default Home;
