import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import scroll from '../utils/images/scrl.jpg';
import forest from '../utils/images/forest.jpg';

function Introduction() {
  const texts = useMemo(() => [
    "Fast asleep at your camp, you awake in the dead of night. The crackling embers of your dwindling fire cast a dim glow, barely illuminating the dense forest around you.",
    "The cold night air wraps around you like a shroud, and the distant hoot of an owl echoes through the darkness.",
    "As you lie there, drifting on the edge of dreams, a sensation stirs within you—a subtle, almost imperceptible prickling at the edges of your consciousness.",
    "It's as if a feather-light touch traces the contours of your thoughts, sending shivers down your spine.",
    "Then, a voice, delicate yet urgent, emerges from the abyss of your mind:",
    "\"Adventurer, please wake up! I have great need of you. You do not know who I am yet, but you are the last hope for us...",
    "We must meet. Come to Bryll, a town to your south.",
    "Find me as quickly as possible; the world is in great peril. Do not delay. Time is of the essence.\"",
    "The words hang in the air, their weight pressing upon your mind like a solemn oath.",
    "The voice recedes, leaving you with a lingering sense of purpose and the lingering sensation of telepathic connection.",
    "With a determined exhale, you rise from your makeshift bedroll and scan the moonlit landscape.",
    "The voice's urgency resonates within you, igniting a spark of curiosity and resolve.",
    "You speak softly to the night, your words carried away by the wind, \"I should find out who's responsible for these mind games.\"",
    "As you step into the unknown, the path to Bryll stretches out before you, winding through moonlit glades and shadowed valleys.",
    "Each step brings you closer to uncovering the mysteries that await in the town to the south...",
    "...Where destiny's tapestry is woven and the fate of the world hangs in the balance."
  ], []);

  const [displayedTextIndex, setDisplayedTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [previousTexts, setPreviousTexts] = useState([]);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  console.log(windowSize);

  useEffect(() => {
    if (displayedText.length === texts[displayedTextIndex].length) {
      setTimeout(() => {
        if (displayedTextIndex < texts.length - 1) {
          setPreviousTexts(prevTexts => [...prevTexts, displayedText]);
          setDisplayedTextIndex(displayedTextIndex + 1);
          setDisplayedText('');
        }
      }, 500);
    } else if (displayedText.length < texts[displayedTextIndex].length) {
      setTimeout(() => {
        setDisplayedText(prevText => prevText + texts[displayedTextIndex][prevText.length]);
      }, 20);
    }
  }, [displayedText, displayedTextIndex, texts]);
  
  const textStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    //textAlign: 'center',

    color: 'white',
    textStyles: 'bold',
    //justifyContent: 'center'
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '30%', // might need to be changed
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white'
  };
  // Can't get this to work. Would be cool but, struggling. Not MVP.
  /*const containerStyle = {
    backgroundImage: "url('/scroll.avif')",
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', 
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  };*/

  return (
    <div class="bkground" style={{ backgroundImage: `url(${forest})`,
    //width: windowSize.current[0],
    //height: windowSize.current[1],
    resizeMode: 'stretch'}}>
      <div className="center stack">
        <div>
          {previousTexts.map((text, index) => (
            <p key={index} style={textStyles}>{text}</p>
          ))}
            <p style={textStyles}>{displayedText}</p>
        </div>

        <Link to={{ pathname: '/gameplay' }}>
          <button style={buttonStyle}>Start Your Adventure</button>
        </Link>
      </div>
    </div>
  );
}

export default Introduction;
