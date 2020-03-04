import React, { useState } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';

export default function Move(props) {
  const [ path, updatePath ] = useState("");
  const currentPath = props.fileMove.path_lower;
  let currentFile = "/" + currentPath.split('/').pop();

  function onChange(e) {
    const value = e.target.value;
    updatePath(value);
  }

  function executeChange() {
    let newPath;
    if (path.length === 0) {
      newPath = currentFile;
    } else {
      newPath = "/" + path + currentFile;
    }


    let move = {
      "from_path": currentPath,
      "to_path": newPath,
    }
    dropbox.filesMoveV2(move)
      .then((response) => {
        props.onDone();
      })
      .catch((error) => {
        console.error("Move File server ERROR: " + error);
      });
  }

  function closeBox() {
    props.onDone();
  }

  return (
    ReactDOM.createPortal(
        <div className="move" style={{marginLeft: "30px"}}>
          <div className="move__container">
            <h1>Move file</h1>
            <p className="move__text">Current location:PepesBox{currentPath}</p>
            <div className="move__inputContainer"><p className="move__inputPrefix">New location: PepesBox/</p>
            <input className="move__input" type="text" onChange={onChange} value={path} placeholder="Leave blank to move to ROOT..."/>
              <p className="move__input__ext">{currentFile}</p>
            </div>
            <div className="move__buttonContainer">
              <button className="move__buttonOk" onClick={executeChange}>Ok</button>
              <button className="move__buttonCancel" onClick={closeBox}>Cancel</button>
            </div>
          </div>
        </div>,
      document.querySelector('body'))

  );
}
