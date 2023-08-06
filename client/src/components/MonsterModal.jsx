import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function MonsterModal({ isOpen, onClose }) {
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
      <h1>You've found a monster!</h1>
        <p>Prepare for battle!</p>
        <button onClick={onClose}>Close</button>
    </dialog>
  );
}

export default MonsterModal;
