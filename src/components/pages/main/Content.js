<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import {
	useObservable,
	state$,
	dropbox,
	token$
} from '../../../utilities/store';

export default function Content() {
	const token = useObservable(token$);
	const { files } = useObservable(state$);
	const [ pic, updatePic ] = useState('');

	// console.log(files.map((file) => file['.tag']));

	function getThumbNail() {
		dropbox
			.filesGetThumbnail({
				path: '/Harley1.jpeg',
				format: 'jpeg',
				size: 'w64h64'
			})
			.then((response) => {
				let fileBlob = URL.createObjectURL(response.fileBlob);
				updatePic(fileBlob);
			});
	}

	useEffect(
		() => {
			getThumbNail();
		},
		[ token ]
	);

	function choose(file) {
		let icon;
		if (file['.tag'] === 'folder') icon = <FolderIcon />;
		else {
			icon = <img src={pic} />;
		}
		return icon;
	}

	return (
		<main className="content">
			<table>
				<thead>
					<tr>
						<th>File</th>
						<th>Name</th>
						<th>Modified</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{files.map((file) => (
						<tr key={file.id}>
							<td>{choose(file)}</td>
							<td>{file.tag}</td>
							<td>
								{file['.tag'] === 'folder' ? (
									<Link to={file.path_lower}>
										{file.name}
									</Link>
								) : (
									file.name
								)}
							</td>
							<td>{file.server_modified}</td>
							<td>
								<div>
									<ul>
										<li>
											<a
												href={file.href}
												download={file.name}
											>
												Download
											</a>
										</li>
									</ul>
									<MoreVertIcon />
								</div>
							</td>
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useObservable, state$ } from '../../../utilities/store';
import FileMore from './FileMore';
import DeletionModal from './Content.DeletionModal';

export default function Content() {
	const [ localState, setLocalState ] = useState({ path: '', modal: false, loading: true });
	const { files } = useObservable(state$);
	const [ showMore, updateShowMore ] = useState(false);
	const [ buttonPos, updateButtonPos ] = useState({ x: '0px', y: '0px' });

	function getButtonPosition(e) {
		updateShowMore(!showMore);
		const buttonPosX = e.target.getBoundingClientRect().x;
		const buttonPosY = e.target.getBoundingClientRect().y;
		updateButtonPos({ x: buttonPosX, y: buttonPosY });
	}

	return (
		<React.Fragment>
			{localState.modal && (
				<DeletionModal path={localState.path} closeModal={() => setLocalState({ path: '', modal: false })} />
			)}
			<main className='content'>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Modified</th>
							<th>Size</th>
							<th />
>>>>>>> 471f961e9d593d0fba1b7be18b3a9f745eca95ff
						</tr>
					</thead>
				</table>
				<table>
					<tbody>
						{files.map((file) => (
							<tr key={file.id}>
								<td>
									{file['.tag'] === 'folder' ? (
										<Link to={file.path_lower}>{file.name}</Link>
									) : (
										file.name
									)}
								</td>
								<td>{file.server_modified}</td>
								<td>{file.size}</td>
								<td>
									<div>
										<button className='fileMoreButton' onClick={getButtonPosition}>
											<MoreVertIcon />
										</button>
										<ul>
											<li>
												<a href={file.link} download={file.name}>
													Download
												</a>
											</li>
											<li>
												<button
													type='button'
													onClick={() =>
														setLocalState({
															path: file.path_lower,
															modal: true
														})}
												>
													Delete
												</button>
											</li>
										</ul>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{showMore && <FileMore buttonPosition={buttonPos} />}
			</main>
		</React.Fragment>
	);
}
