import React from 'react';
import spinner from './globalSpinner.module.scss';

const GlobalSpinner = (props) => {
  return (
    <div className={spinner['global-spinner-overlay']}>
      <p>Loading...</p>
    </div>
  );
};

export default GlobalSpinner;
