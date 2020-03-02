import React, { useState } from 'react';
import { useObservable, state$ } from '../../../utilities/store';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';

export default function FolderPopup ({onSubmit, toggle, visibility}) {

  const [folderInput, updateFolderInput] = useState('');
  const [path, setPath] = useState('');
  const { files } = useObservable(state$);

  function newFolder(e) {
		e.preventDefault();
		dropbox
			.filesCreateFolderV2({ path: path + '/' + folderInput})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.error(error);
			});
	}

  function updateInputFolder (e) {
  	console.log(e.target.value)
  	updateFolderInput(e.target.value)
  }


return ReactDOM.createPortal(
    <div className='folder-popup' style={{visibility: visibility}}>
      <h1>Create Folder</h1>
      <CloseIcon onClick={toggle} />
      <div className='popup-container'>
        <form onSubmit={newFolder}>
          <label>Name:</label>
          <input type='text' onChange={updateInputFolder} value={folderInput} id='create-folder' placeholder="Folder name"/>
          <button onClick={toggle}type='submit'>Submit</button>
          </form>
        </div>
        <div className='popup-folders'>
          {files.filter((file) => (
            file['.tag'] === 'folder'
          ))
          .map((file) => (
            <div onClick={ () => setPath(file.path_lower)}>{file.name}</div>
          ))}
          </div>
      </div>,
  document.querySelector('body')
  )
}
