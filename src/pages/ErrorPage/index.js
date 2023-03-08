import React from "react";
import './style.scss';

function ErrorPage() {
  return (
    <div className="error-page__block" >
      <h1 className="error-page__block-heading" >Whoops!</h1>

      <p className="error-page__block-text" >404 Page Not Found</p>
    </div>
  );
}

export default ErrorPage;
