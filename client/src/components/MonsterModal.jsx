function MonsterModal({ isOpen, onClose, type }) {

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
