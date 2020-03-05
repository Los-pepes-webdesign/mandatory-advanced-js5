import React from 'react';

export default function Spinner() {

  return(
    <>
    <div className="spinnerContainer">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <p className="spinnerContainer__text">Loading...</p>
    </div>
    </>
  );

}
