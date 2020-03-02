import React, { useState } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';

export default function Rename(props) {
  const [ filename, updateFilename ] = useState("");
  const oldName = props.fileRename.path_lower.substring(1);
  let extension = "." + props.fileRename.path_lower.split('.').pop();

  function onChange(e) {
    updateFilename(e.target.value);
  }

  function executeChange() {
    let newName = filename + extension;

    let rename = {
      "from_path": props.fileRename.path_lower,
      "to_path": "/" + newName,
    }
    dropbox.filesMoveV2(rename);
    props.onDone();
  }

  function closeBox() {
    props.onDone();
  }

  return (
    ReactDOM.createPortal(
        <div className="rename" style={{marginLeft: "30px"}}>
          <h1>Rename file</h1>
          <p className="rename__text">Change name of: {oldName}</p>
          <div className="rename__inputContainer">
          <input className="rename__input" type="text" onChange={onChange} value={filename}/>
            <p className="rename__input__ext">{extension}</p>
          </div>
          <div className="rename__buttonContainer">
            <button className="rename__buttonOk" onClick={executeChange}>Ok</button>
            <button className="rename__buttonCancel" onClick={closeBox}>Cancel</button>
          </div>
        </div>,
      document.querySelector('body'))

  );
}
