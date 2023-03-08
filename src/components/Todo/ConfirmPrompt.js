import React, { useState } from "react";

export const ConfirmPrompt = ({ deleteTodo, updDeleteClicked }) => {
  const [show, setShow] = useState(true);

  const handleClickYes = () => {
    deleteTodo();
    setShow(false);
  }

  const handleClickNo = () => {
    updDeleteClicked();
    setShow(false);
  }

  return (
    show ?
      <div className='prompt' >
        Do you want to delete it?

        <div className='prompt-buttons__block' >
          <button
            onClick={handleClickYes}
            className='prompt-button yes'
          >
            Yes
          </button>

          <button
            onClick={handleClickNo}
            className='prompt-button no'
          >
            No
          </button>
        </div>
      </div>
      : <></>
  );
};