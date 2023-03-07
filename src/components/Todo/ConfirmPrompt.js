import React, { useState } from "react";

export const ConfirmPrompt = ({ deleteTodo }) => {
  const [show, setShow] = useState(true);

  return (
    show ?
      <span className='toast' >
        Do you want to delete it?

        <div className='toast-buttons__block' >
          <button
            className='toast-button yes'
            onClick={() => {
              deleteTodo();
              setShow(false);
            }}
          >
            Yes
          </button>

          <button className='toast-button no' onClick={() => setShow(false)}>
            No
          </button>
        </div>
      </span>
      : <></>
  );
};