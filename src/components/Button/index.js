import React from 'react';
import './style.scss';

function Button({ children, onClick, disabled, type }) {
  const DANGER_COLOR = '#EB2E2E';
  const WARNING_COLOR = '#ffcc00';
  const SUCCESS_COLOR = '#339900';
  const PRIMARY_COLOR = '#007bff';
  const SECONDARY_COLOR = '#595f64';

  const style = {
    cursor: disabled && 'not-allowed',
    backgroundColor:
      children === 'Save' ? WARNING_COLOR :
        disabled ? SECONDARY_COLOR :
          children === 'Logout' ? DANGER_COLOR :
            children === 'Add' ? SUCCESS_COLOR :
              PRIMARY_COLOR
  };

  return (
    <>
      <button
        className='button'
        type={type}
        style={style}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  )
}

export default Button;