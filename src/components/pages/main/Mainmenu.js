import React, { useState, useRef } from 'react';
import { dropbox, setState$, token$, setToken$, useObservable } from '../../../utilities/store';


export default function Menu() {
	const fileInputRef = useRef(null);
	const folderInputRef = useRef(null);
	const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

	function fileUpload (e) {
		e.preventDefault();
		let file = fileInputRef.current.files[0];
		console.log(file);
		 if (file.size < UPLOAD_FILE_SIZE_LIMIT) {
			 dropbox.filesUpload({path: '/' + file.name, contents: file})
			 .then(function(response) {
				 console.log('File uploaded!');
			 })
			 .catch(function(error) {
					 console.error(error);
				});
		}
	}


	function newFolder (e) {
		e.preventDefault();
		console.log()
		dropbox.filesCreateFolderV2({path: '/' + folderInputRef.current.value })
  	.then(function(response) {
    console.log(response);
  	})
  	.catch(function(error) {
    console.error(error);
  	});
	}

	return (

		<aside className='mainmenu'>
			<p>Upload File</p>
			<br></br>
				 <form onSubmit={fileUpload}>
					 <input ref={fileInputRef} type="file" id="file-upload" />
					 <button type="submit">Submit</button>
				 </form>
				 <form onSubmit={newFolder}>
					 <p>Create Folder</p>
					 <input type="text" ref={folderInputRef} id="create-folder" />
					 <button type="submit">Submit</button>
				 </form>
		</aside>
		);
}
