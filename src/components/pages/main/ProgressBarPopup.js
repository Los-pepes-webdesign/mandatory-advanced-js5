import React, { useState } from 'react';

export default function ProgressBarPopup(props) {
  const [ finished, updateFinished ] = useState(false);
  let progress = props.uploadProgress;

  let progressStyle = {
    width: progress + "%",
  };

  if (progress === 100 && !finished) {
    updateFinished(true);
  }

  function onClick(){
    props.uploadPopup(false);
  }

  return(
    <div className="progressBarPopup">
      <p className="progressBarPopup__text">Uploading {props.fileUploading.name}</p>
      <div className="progressBarPopup__graphicsContainer">
        <div className="progressBarPopup__graphicsContainer__progress" style={progressStyle}></div>
      </div>
      { finished ? <div className="progressBarPopup__finished">
          <p className="progressbarPopup__finished__text">
            Upload Complete
          </p>
          <button className="progressBarPopup__finished__button" onClick={onClick}>Arriba!</button>
        </div> : <div className="progressBarPopup__dummy" /> 
      }
    </div>
  );
}
