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
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
