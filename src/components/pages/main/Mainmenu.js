import React, { useState, useRef } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import FolderPopup from './FolderPopup';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PublishIcon from '@material-ui/icons/Publish';
import ProgressBarPopup from './ProgressBarPopup';

export default function Mainmenu({ path }) {
	const fileInputRef = useRef(null);
	const [ visible, toggleVisible ] = useState(false);
	const [ progress, updateProgress ] = useState(0);
	const [ uploadInProgress, updateUploadInProgress ] = useState(false);
	const [ currentFile, updateCurrentFile ] = useState({});
	const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
	let hash = window.location.pathname;

	function fileUpload(e) {
		e.preventDefault();
		updateUploadInProgress(true);

		if (hash.length === 1) {
			hash = '';
		}

		let file = fileInputRef.current.files[0];
		updateCurrentFile(file);
		let maxChunk;

		if (file.size < 1024 * 1024) {
			// If filesize is less than 1 MB, upload with single upload
			dropbox
				.filesUpload({ path: hash + '/' + file.name, contents: file })
				.then(function() {
					updateProgress(100);
					console.log('File uploaded!');
				})
				.catch(function(error) {
					console.error(error);
				});
			return;
		}
		else if (file.size < 10 * 1024 * 1024 && file.size >= 1024 * 1024) {
			// Max chunk size is set to 10 % of total file size rounded to the nearest integer, needed in order to create a upload progressbar
			maxChunk = Math.round(file.size / 4);
		}
		else if (file.size < UPLOAD_FILE_SIZE_LIMIT && file.size >= 10 * 1024 * 1024) {
			// Max chunk size is set to 10 % of total file size rounded to the nearest integer, needed in order to create a upload progressbar
			maxChunk = Math.round(file.size / 10);
		}
		else if (file.size >= UPLOAD_FILE_SIZE_LIMIT) {
			// Max chunk size is set to 8 MB (recommended chunk size for Dropbox API)
			maxChunk = 8 * 1024 * 1024;
		}

		let workItems = [];
		let offset = 0;

		while (offset < file.size) {
			let chunkSize = Math.min(maxChunk, file.size - offset);
			workItems.push(file.slice(offset, offset + chunkSize));
			offset += chunkSize;
		}

		const task = workItems.reduce((acc, chunk, fileId, items) => {
			if (fileId === 0) {
				// Starting multipart upload of file
				return acc.then(function() {
					return dropbox
						.filesUploadSessionStart({
							close: false,
							contents: chunk
						})
						.then((response) => response.session_id);
				});
			}
			else if (fileId < items.length - 1) {
				// Append part to the upload session
				return acc.then(function(sessionId) {
					let cursor = {
						session_id: sessionId,
						offset: fileId * maxChunk
					};
					updateProgress(cursor.offset / file.size * 100);
					return dropbox
						.filesUploadSessionAppendV2({
							cursor: cursor,
							close: false,
							contents: chunk
						})
						.then(() => sessionId);
				});
			}
			else {
				// Last chunk of data, close session
				return acc.then(function(sessionId) {
					let cursor = {
						session_id: sessionId,
						offset: file.size - chunk.size
					};
					let commit = {
						path: hash + '/' + file.name,
						mode: 'add',
						autorename: true,
						mute: false
					};
					return dropbox.filesUploadSessionFinish({
						cursor: cursor,
						commit: commit,
						contents: chunk
					});
				});
			}
		}, Promise.resolve());

		task
			.then(function(result) {
				updateProgress(100);
				console.log('File Uploaded!');
			})
			.catch(function(error) {
				console.error(error);
			});
		return false;
	}

	// ======== ORIGINAL UPLOAD ========= For safe keeping =====
	// dropbox
	// 	.filesUpload({ path: hash + '/' + file.name, contents: file })
	// 	.then(function() {
	// 		console.log('File uploaded!');
	// 	})
	// 	.catch(function(error) {
	// 		console.error(error);
	// 	});
	// ==========================================================

	function showPopup() {
		toggleVisible(true);
	}

	return (
		<React.Fragment>
			{uploadInProgress && (
				<ProgressBarPopup
					uploadProgress={progress}
					uploadPopup={updateUploadInProgress}
					fileUploading={currentFile}
				/>
			)}
			{visible && <FolderPopup path={path} closePopup={() => toggleVisible(false)} />}
			<aside
				className='mainmenu'
				style={{
					backgroundImage: `url(${process.env.PUBLIC_URL}/assets/MexicanCactusandSun.png)`
				}}
			>
				<div
					className='mainmenu__hotMexicanGuy'
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/assets/hotMexicanGuy.png)`
					}}
				/>
				<div className='mainmenu__links'>
					<div className='mainmenu__home'>
						<Link to='/'>
							<HomeIcon />
							<label>Home</label>
						</Link>
					</div>
					<div className='mainmenu__favorite'>
						<Link to='/starred'>
							<StarIcon />
							<label>Favorites</label>
						</Link>
					</div>
					<div className='mainmenu__upload'>
						<form onSubmit={fileUpload} id='file-upload-form'>
							<PublishIcon />
							<label id='folder_label'>
								Upload File
								<input
									ref={fileInputRef}
									onChange={fileUpload}
									placeholder='Upload File'
									type='file'
									id='file-upload-input'
									className='hidden'
								/>
							</label>
						</form>
					</div>
					<div className='mainmenu__newfolder'>
						<button onClick={showPopup}>
							<CreateNewFolderIcon />
							<label>New Folder</label>
						</button>
					</div>
				</div>
			</aside>
		</React.Fragment>
	);
}
