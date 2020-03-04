import React, { useState, useEffect } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';

export default function Rename(props) {
  // States
  const [ path, updatePath ] = useState("");
  const [ isFolder, updateIsFolder ] = useState(false);
  const [ filename, updateFilename ] = useState("");
  const [ extension, updateExtension ] = useState("");

  const filePath = props.fileRename.path_lower;
  const oldName = filePath.substring(1);
  const regex = /^(.*[\\\/])/g;
  const pathFront = filePath.match(regex);

  useEffect(() => {
    checkFile();
  },[]);

  function onChange(e) {
    updateFilename(e.target.value);
  }

  function checkFile(){
    if (props.fileRename[".tag"] === "folder") {
      updateIsFolder(true);
    } else {
      const currentExt = "." + props.fileRename.path_lower.split('.').pop();
      updateExtension(currentExt);
      updateIsFolder(false);
    }
  }

  function executeChange() {
    const newName = pathFront + filename + extension;
    console.log(newName);
    const rename = {
      "from_path": filePath,
      "to_path": newName,
    }
    dropbox.filesMoveV2(rename)
      .then((response) => {
        props.onDone();
      })
      .catch((error) => {
        console.error("Rename File server ERROR: " + error);
      });
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
