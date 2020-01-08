import React from 'react';
import styles from './Container.module.css';

export default React.memo(function Container(props) {
  return (
    <div
      className={styles.container}
    >
      {props.children}
    </div>
  );
});