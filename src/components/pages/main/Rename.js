import React, { useState, useEffect } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';

export default function Rename(props) {
  const [ path, updatePath ] = useState("");
  const [ isFolder, updateIsFolder ] = useState(false);
  const [ filename, updateFilename ] = useState("");
  const [ extension, updateExtension ] = useState("");
  const oldName = props.fileRename.path_lower.substring(1);
  let pathFront = props.fileRename.path_lower;
  //pathFront.split('/').pop();

  let reg = /^(.*[\\\/])/g;
  let newFilePath = pathFront.match(reg);
  console.log(newFilePath);


  //let currentFile = "/" + currentPath.split('/').pop();

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
    const newName = filename + extension;
    const rename = {
      "from_path": props.fileRename.path_lower,
      "to_path": "/" + newName,
    }
    dropbox.filesMoveV2(rename)
      .then((response) => {
        props.onDone();
      })
      .catch((error) => {
        console.error("Rename server ERROR: " + error);
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
