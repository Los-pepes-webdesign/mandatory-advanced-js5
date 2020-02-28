import React from 'react';


export default function FileMore(props){

  function alertBox() {
    alert("Naj! Jesper jobbar på RENAME och MOVE");
  }

  return(
      <>
        <div className="fileMore" style={{left: props.buttonPosition.x - 50, top: props.buttonPosition.y + 40 }}>
          <div className="fileMore__textContainer" onClick={alertBox}>
            <p className="fileMore__textContainer__text">Rename</p>
          </div>
          <div className="fileMore__textContainer" onClick={alertBox}>
            <p className="fileMore__textContainer__text">Move</p>
          </div>
          <div className="fileMore__textContainer">
            <p className="fileMore__textContainer__text">Download</p>
          </div>
          <div className="fileMore__textContainer">
            <p className="fileMore__textContainer__text">Details</p>
          </div>
          <div className="fileMore__textContainer">
            <p className="fileMore__textContainer__text">Delete</p>
          </div>
        </div>
      </>
  );
}
