import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { toggleStar } from '../../../utilities/helpers';
import { state$, useObservable } from '../../../utilities/store';

// icons
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

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
			<main className='content'>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Modified</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{queriedFiles.map((file) => (
							<tr className='file' key={file.id}>
								<td className='file__thumbnail'>
									{file['.tag'] === 'folder' ? (
										<FolderIcon />
									) : file.thumbnail ? (
										<img
											src={`data:image/png;base64, ${file.thumbnail}`}
											alt=''
										/>
									) : (
										<InsertDriveFileIcon />
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
										<Moment format='YYYY/MM/DD'>{file.server_modified}</Moment>
									</span>
								</td>
								<td className='file__size'>
									<span>{file.size}</span>
								</td>
								<td className='file__starred' onClick={() => toggleStar(file)}>
									{file.starred ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
								</td>
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
			</main>
		</React.Fragment>
	);
}
