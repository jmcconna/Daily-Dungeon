import { useTypedMessage } from '../../hooks/index.js';
import styles from './styles.module.css';

const BattleAnnouncer = ({ message }) => {
  const typedMessage = useTypedMessage(message);

  return (
    <div className={styles.main}>
      <div className={styles.message}>{typedMessage}</div>
    </div>
  );
};

export default BattleAnnouncer;
