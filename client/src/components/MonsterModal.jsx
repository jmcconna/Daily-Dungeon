import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function MonsterModal({ isOpen, onClose, type }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isOpen) {
  //     // close the modal after 2 seconds to redirect to combat mode
  //     const timer = setTimeout(() => {
  //       onClose();
  //       navigate('/combat');
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen, onClose, navigate]);

  return (
    <dialog open={isOpen}>
      {(() => {
        switch(type) {
          case 1: 
            return (
              <>
                <h1>You've found a monster!</h1>
                <p>Prepare for battle!</p>
              </>
            );
          case 2:
            return (
              <>
                <p>You made it to the end, amazing!</p>
                <button onClick={onClose}>Head back home</button>
              </>
            );
          default: 
            return null;
        }
      })()}
    </dialog>
  );

}

export default MonsterModal;
