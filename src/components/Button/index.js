import React from 'react';
import { buttonsTexts, buttonColors } from '../../data';
import Loader from '../Loader';
import './style.scss';

const Button = ({ children, onClick, disabled, type }) => {
  const style = {
    cursor: disabled && 'not-allowed',
    backgroundColor:
      disabled ? buttonColors.SECONDARY_COLOR :
        children === buttonsTexts.SAVE ? buttonColors.WARNING_COLOR :
          children === buttonsTexts.LOGOUT ? buttonColors.DANGER_COLOR :
            children === buttonsTexts.ADD ? buttonColors.SUCCESS_COLOR :
              buttonColors.PRIMARY_COLOR
  };

  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  }

  return (
    <>
      <button
        className='button'
        type={type}
        style={style}
        disabled={disabled}
        onClick={(event) => handleClick(event)}
      >
        {
          disabled ?
            <Loader isSpinner={true} /> :
            children
        }
      </button>
    </>
  )
}

export default Button;