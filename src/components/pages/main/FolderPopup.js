import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';

export default function FolderPopup ({name, onChange, onSubmit, visibility, toggle}) {

return ReactDOM.createPortal(
    <div className='folder-popup' style={{visibility: visibility}}>
    <h1>Create Folder</h1>
    <CloseIcon onClick={toggle} />
    <div className='popup-container'>
    <form onSubmit={onSubmit}>
    <label>Name:</label>
    <input type='text' onChange={onChange} value={name} id='create-folder' placeholder="Folder name"/>
    <button onClick={toggle}type='submit'>Submit</button>
    </form>
    </div>
    </div>,
  document.querySelector('body')
  )
}
