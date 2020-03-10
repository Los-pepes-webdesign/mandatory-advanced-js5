import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { state$, useObservable } from '../../../utilities/store';

// icons
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// components
import FileMore from './FileMore';

export default function QueriedContent() {
	const { queriedFiles } = useObservable(state$);

	const [ showMore, updateShowMore ] = useState(false);
	const [ buttonPos, updateButtonPos ] = useState({ x: '0px', y: '0px' });

	function getButtonPosition(e, fileId) {
		if (showMore === fileId) {
			updateShowMore(false);
		}
		else {
			updateShowMore(fileId);
		}

		const buttonPosX = e.target.getBoundingClientRect().x;
		const buttonPosY = e.target.getBoundingClientRect().y;
		updateButtonPos({ x: buttonPosX, y: buttonPosY });
	}

	return (
		<React.Fragment>
			<main className='queried-content'>
				<section className='tableHeader-queried'>
					<table className='fileTable '>
						<thead>
							<tr>
								{/* thumbnail */}
								<th />
								<th>
									<h4>Name</h4>
								</th>
								<th>
									<h4>Modified</h4>
								</th>
								<th>
									<h4>Size</h4>
								</th>
								{/* starred */}
								<th />
								{/* more */}
								<th />
							</tr>
						</thead>
					</table>
				</section>
				<section className='tableContent'>
					<table className='fileTable'>
						<tbody>
							{queriedFiles.map((file) => (
								<tr className='file' key={file.id}>
									<td className='file__thumbnail'>
										{file['.tag'] === 'folder' ? (
											<FolderIcon style={{ fontSize: 45 }} />
										) : file.thumbnail ? (
											<img
												src={`data:image/png;base64, ${file.thumbnail}`}
												alt=''
											/>
										) : (
											<InsertDriveFileIcon style={{ fontSize: 45 }} />
										)}
									</td>
									<td className='file__name'>
										<span>
											{file['.tag'] === 'folder' ? (
												<Link to={file.path_lower}> {file.name}</Link>
											) : (
												<a href={file.link} download={file.name}>
													{file.name}
												</a>
											)}
										</span>
									</td>
									<td className='file__modified'>
										<span>
											<Moment format='YYYY/MM/DD'>
												{file.server_modified}
											</Moment>
										</span>
									</td>
									<td className='file__size'>
										<span>{file.size}</span>
									</td>
									<td />
									<td className='file__more'>
										<div>
											<button
												className='fileMoreButton'
												onClick={(e) => getButtonPosition(e, file.id)}
											>
												<MoreVertIcon />
											</button>
											{showMore === file.id && (
												<FileMore
													buttonPosition={buttonPos}
													fileDetails={file}
													showMoreFunction={updateShowMore}
													onClose={() => updateShowMore(false)}
												/>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className='spacer' />
				</section>
			</main>
		</React.Fragment>
	);
}
