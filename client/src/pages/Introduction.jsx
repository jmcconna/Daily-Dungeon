import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

function Introduction() {
  const texts = useMemo(() => [
    "\"Good day, my young apprentice!",
    "I remember when I was your age... eager to prove myself out in the wilds.",
    "But you still have much to learn.",
    "I can teach you what you need to know to survive.",
    "Just bring me back a portion of what you find, and I'll show you how to hone your skills in battle, navigation, and the arts.",
    "Do not delay. Time is of the essence.\"",
    "Signed, Master Clavicus"
  ], []);

  const [displayedTextIndex, setDisplayedTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [previousTexts, setPreviousTexts] = useState([]);

  useEffect(() => {
    if (displayedText.length === texts[displayedTextIndex].length) {
      setTimeout(() => {
        if (displayedTextIndex < texts.length - 1) {
          setPreviousTexts(prevTexts => [...prevTexts, displayedText]);
          setDisplayedTextIndex(displayedTextIndex + 1);
          setDisplayedText('');
        }
      }, 1500);
    } else if (displayedText.length < texts[displayedTextIndex].length) {
      setTimeout(() => {
        setDisplayedText(prevText => prevText + texts[displayedTextIndex][prevText.length]);
      }, 50); // Adjust the delay here as needed
    }
  }, [displayedText, displayedTextIndex, texts]);

  const textStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'center',
    color: 'white'
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '30%', // Adjust the value to your preference
    left: '50%',
    transform: 'translateX(-50%)',
    display: displayedTextIndex === texts.length - 1 && displayedText.length === texts[displayedTextIndex].length
      ? 'block'
      : 'none',
  };

  return (
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
  );
}

export default Introduction;
