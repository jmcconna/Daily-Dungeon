import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import scroll from '../utils/images/scrl.jpg';

function Introduction() {
  const texts = useMemo(() => [
    "\"Good day, my young apprentice!",
    "I remember when I was your age... eager to prove myself out in the wilds.",
    "But you still have much to learn.",
    "I can teach you what you need to know to survive.",
    "I'll show you how to hone your skills in battle, navigation, and the arts.",
    "Find me as quickly as possible, the world is in great peril.",
    "Do not delay. Time is of the essence.\"",
    "Signed, Master Clavicus"
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
      }, 30);
    }
  }, [displayedText, displayedTextIndex, texts]);
  
  const textStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    //textAlign: 'center',
    color: 'black',
    textStyles: 'bold',
    //justifyContent: 'center'
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '30%', // might need to be changed
    left: '50%',
    transform: 'translateX(-50%)',
    display: displayedTextIndex === texts.length - 1 && displayedText.length === texts[displayedTextIndex].length
      ? 'block'
      : 'none',
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
    <div style={{ backgroundImage: `url(${scroll})`,
    width: windowSize.current[0],
    height: windowSize.current[1],
    resizeMode: 'stretch'}}>
      <div className="center stack">
        <div>
          {previousTexts.map((text, index) => (
            <p key={index} style={textStyles}>{text}</p>
          ))}
        </div>
        <p style={textStyles}>{displayedText}</p>
        <Link to={{ pathname: '/gameplay' }}>
          <button style={buttonStyle}>Start Your Adventure</button>
        </Link>
      </div>
    </div>
  );
}

export default Introduction;
