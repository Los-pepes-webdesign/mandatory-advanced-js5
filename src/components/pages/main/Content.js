import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import Moment from 'react-moment';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { useObservable, state$ } from '../../../utilities/store';
import FileMore from './FileMore';
import DeletionModal from './Content.DeletionModal';
import MoreFiles from './Content.MoreFiles';

export default function Content() {
	const [ localState, setLocalState ] = useState({
		path: '',
		modal: false,
		loading: true
	});
	const { files, hasMore } = useObservable(state$);
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
									{file['.tag'] === 'folder' ? (
										<Link to={file.path_lower}>{file.name}</Link>
									) : (
										file.name
									)}
								</td>
								<td className='file__starred' />
								<td className='file__modified'>
								{/*	<Moment format='YYYY/MM/DD'>{file.server_modified}</Moment> */}
								</td>
								<td className='file__size'>{file.size}</td>
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
										<ul>
											<li>
												<a href={file.link} download={file.name}>
													Download
												</a>
											</li>
										</ul>
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
