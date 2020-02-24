import React, {useState, useReducer, useEffect} from 'react';
import { Redirect } from 'react-router';
import { Dropbox } from 'dropbox';
import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';

const dropbox = new Dropbox({
	clientId : 'wwft9hg3g9qhuth',
	fetch
	});

export default function Main() {
	const [allFiles, setAllFiles] = useState([]);
	const [URLfile, setURLfile] = useState('');
	const [fileName, setFileName] = useState('')

	useEffect(() => {
		if (window.location.hash.length < 2) return <Redirect to='/login' />;
			const regex = new RegExp(/=(.*)(?=&token_type)/, 'i');
			const token = window.location.hash.match(regex)[1];
		getAllFiles(token);
	}, [])

		function getAllFiles (token) {
			dropbox.setAccessToken(token);
			dropbox.filesListFolder({
			path: ''
		}).then(response => {
			console.log(response);
			setAllFiles(response.entries);
		})
	}

function downloadSingle () {
	dropbox.filesGetTemporaryLink({ path: '/testpic.png'})
			.then(response => {
				console.log(response);
				const blob = response.fileBlob;
				const url = URL.createObjectURL(blob);
				console.log(url);
				console.log(blob);
				setURLfile(url);
			})
			.catch(error => {
			console.log(error);
		})
}

	return (
		<div className='main'>
			<Mainmenu />
			<Header />
			<Profile />
			<Content files={allFiles} />
			<a onClick={downloadSingle} href={URLfile} download="testpic.png">test download</a>
		</div>
	);
}
