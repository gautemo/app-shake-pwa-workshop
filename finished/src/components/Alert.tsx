import React from 'react';
import { ErrorIcon } from './icons/Error';
import { Info } from './icons/Info';
import styles from '../style/Alert.module.css';

interface Props{
  type: 'error' | 'warning' | 'info';
  message?: string;
  children?: React.ReactNode;
  toast?: boolean;
  closeAlert?: () => void;
}

const Alert = (props: Props) => {
  return (
    <div className={`${styles.alert} ${styles[props.type]} ${props.toast ? styles.toast : ''}`}>
      { (props.type === 'info' || props.type === 'warning') && <Info /> }
      { props.type === 'error' && <ErrorIcon /> }
      <p>{props.message}</p>
      { props.children }
      { props.closeAlert && <span onClick={props.closeAlert} className={styles.close}>x</span>}
    </div>
  )
}

export { Alert }