import { Link } from 'react-router-dom';

function Introduction() {
  return (
    <div>
      <h1>Good day, my young apprentice!</h1>
      <p>I remember when I was your age... eager to prove myself out in the wilds. But you still have much to learn. I can teach you what you need to know to survive. Just bring me back a portion of what you find, and I&apos;ll give show you how to hone your skills in battle, navigation, and the arts.
      </p>
      <Link to={{ pathname: '/gameplay'}}>
        <button>Play Here!</button>
      </Link>
    </div>
  );
}

export default Introduction;