import React from 'react';
import './style.scss';

function Button({ txt, onClick, disabled }) {
  const DANGER_COLOR = '#EB2E2E';
  const WARNING_COLOR = '#ffcc00';
  const SUCCESS_COLOR = '#339900';
  const PRIMARY_COLOR = '#007bff';
  const SECONDARY_COLOR = '#595f64';

  const style = {
    cursor: disabled && 'not-allowed',
    backgroundColor:
      disabled ? SECONDARY_COLOR :
        txt === 'Logout' ? DANGER_COLOR :
          txt === 'Add' ? SUCCESS_COLOR :
            txt === 'Save' ? WARNING_COLOR :
              PRIMARY_COLOR
  };

  return (
    <>
      <button
        className='button'
        type='button'
        style={style}
        onClick={onClick}
        disabled={disabled}
      >
        {txt}
      </button>
    </>
  )
}

export default Button;