import React, { useState, useRef } from 'react';
import { dropbox, setState$, token$, setToken$, useObservable } from '../../../utilities/store';


export default function Menu() {
	const myRef = useRef(null);

	function fileUpload (e) {
		e.preventDefault();

		const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
		let file = myRef.current.files[0];


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




	function folderUpload () {


	}

	function newFolder () {


	}



	return (


		<aside className='mainmenu'>Files
			<br></br>
			 <a href="/">File upload</a>
				 <form onSubmit={fileUpload}>
					 <input ref={myRef} type="file" id="file-upload" />
					 <button type="submit">Submit</button>
				 </form>





		</aside>
		);
}
