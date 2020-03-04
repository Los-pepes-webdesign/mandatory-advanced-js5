import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { toggleStar } from '../../../utilities/helpers';

// icons
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import FileMore from './FileMore';
import { useObservable, state$ } from '../../../utilities/store';

export default function StarredContent() {
	const [ showMore, updateShowMore ] = useState(false);
	const [ buttonPos, updateButtonPos ] = useState({ x: '0px', y: '0px' });
	const { starredFiles } = useObservable(state$);
	const [ starred, setStarred ] = useState(starredFiles);

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

	useEffect(
		() => {
			if (
				JSON.parse(localStorage.getItem('starredFiles')).length !== 0 &&
				starredFiles.length === 0
			) {
				setStarred(JSON.parse(localStorage.getItem('starredFiles')));
			}
			else {
				setStarred(starredFiles);
			}
		},
		[ starredFiles ]
	);

	return (
		<main className='content'>
			<table className='fileTable'>
				<tbody>
					{starred.map((file) => (
						<tr className='file' key={file.id}>
							<td className='file__thumbnail'>
								{file['.tag'] === 'folder' ? (
									<FolderIcon />
								) : file.thumbnail ? (
									<img src={`data:image/png;base64, ${file.thumbnail}`} alt='' />
								) : (
									<InsertDriveFileIcon />
								)}
							</td>
							<td className='file__name'>
								<span>
									{file['.tag'] === 'folder' ? (
										<Link to={file.path_lower}>{file.name}</Link>
									) : (
										file.name
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
	);
}
