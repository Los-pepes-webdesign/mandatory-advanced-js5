import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// store
import { useObservable, state$ } from '../../../utilities/store';

// icons
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

// components
import FileMore from './FileMore';
import MoreFiles from './Content.MoreFiles';

export default function Content() {
	const [ isLoading, setIsLoading ] = useState(true);
	const { files, hasMore } = useObservable(state$);
	const [ showMore, updateShowMore ] = useState(false);
	const [ buttonPos, updateButtonPos ] = useState({ x: '0px', y: '0px' });

	console.log(isLoading);

	useEffect(
		() => {
			if (files.length !== 0) setIsLoading(false);
		},
		[ files ]
	);

	function getButtonPosition(e, fileId) {
		if (showMore === fileId) {
			updateShowMore(false);
		} else {
			updateShowMore(fileId);
		}

		const buttonPosX = e.target.getBoundingClientRect().x;
		const buttonPosY = e.target.getBoundingClientRect().y;
		updateButtonPos({ x: buttonPosX, y: buttonPosY });
	}

	return (
		<React.Fragment>
			{isLoading && <p>Loading...</p>}
			<main className="content">
				<table>
					<thead>
						<tr>
							<th />
							<th>Name</th>
							<th />
							<th>Modified</th>
							<th>Size</th>
							<th />
						</tr>
					</thead>
				</table>
				<table>
					<tbody>
						{files.map((file) => (
							<tr className="file" key={file.id}>
								<td className="file__thumbnail">
									{file['.tag'] === 'folder' ? (
										<FolderIcon />
									) : file.thumbnail ? (
										<img
											src={`data:image/png;base64, ${file.thumbnail}`}
											alt=""
										/>
									) : (
										<InsertDriveFileIcon />
									)}
								</td>
								<td className="file__name">
									{file['.tag'] === 'folder' ? (
										<Link to={file.path_lower}>
											{file.name}
										</Link>
									) : (
										file.name
									)}
								</td>
								<td className="file__modified">
									<Moment format="YYYY/MM/DD">
										{file.server_modified}
									</Moment>
								</td>
								<td className="file__size">{file.size}</td>
								<td className="file__starred">
									{file.starred ? (
										<StarRoundedIcon />
									) : (
										<StarBorderRoundedIcon />
									)}
								</td>
								<td className="file__more">
									<div>
										<button
											className="fileMoreButton"
											onClick={(e) =>
												getButtonPosition(e, file.id)}
										>
											<MoreVertIcon />
										</button>
										{showMore === file.id && (
											<FileMore
												buttonPosition={buttonPos}
												fileDetails={file}
												showMoreFunction={
													updateShowMore
												}
												onClose={() =>
													updateShowMore(false)}
											/>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{hasMore && <MoreFiles />}
			</main>
		</React.Fragment>
	);
}
