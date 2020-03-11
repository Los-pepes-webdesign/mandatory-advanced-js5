import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// utilities
import { useObservable, state$ } from '../../../utilities/store';
import { toggleStar } from '../../../utilities/helpers';
import { formatPaths } from '../../../utilities/helpers';

// icons
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

// components
import FileMore from './FileMore';
import MoreFiles from './Content.MoreFiles';
import Spinner from './Spinner';

export default function Content() {
	const [ isLoading, setIsLoading ] = useState(true);
	const { files, hasMore } = useObservable(state$);
	const [ showMore, updateShowMore ] = useState(false);
	const [ buttonPos, updateButtonPos ] = useState({ x: '0px', y: '0px' });
	const [ paths, setPaths ] = useState([]);
	const refTableContent = useRef(null);

	let hash = window.location.pathname;

	useEffect(
		() => {
			if (hash === '/starred' || hash === '/search') {
				return;
			}
			let string = hash
				.replace(/%20/g, ' ')
				.replace(/%C3%A5/g, 'å')
				.replace(/%C3%A4/g, 'ä')
				.replace(/%C3%B6/g, 'ö');
			let paths = string.split('/');

			setPaths(formatPaths(paths));

			if (files.length !== 0) setIsLoading(false);
		},
		[ files, hash ]
	);

	function getButtonPosition(e, fileId) {
		if (showMore === fileId) {
			updateShowMore(false);
		} else {
			updateShowMore(fileId);
		}

		const buttonPosY = e.target.getBoundingClientRect().y;
		const clickPos = { x: e.clientX, y: e.clientY };

		if (buttonPosY > refTableContent.current.offsetHeight) {
			updateButtonPos({ x: clickPos.x - 276, y: clickPos.y - 270 });
		} else {
			updateButtonPos({ x: clickPos.x - 276, y: clickPos.y - 118 });
		}
	}

	return (
		<React.Fragment>
			<main className="content">
				<section className="tableHeader">
					<div className="path">
						<span>
							<Link to="/">Pepebox</Link>
							<span>&nbsp;</span>
						</span>
						{paths.map((path) => (
							<span key={path.path}>
								<Link to={path.path}>
									&gt;&nbsp;{path.title}&nbsp;
								</Link>
							</span>
						))}
					</div>
					<table className="fileTable ">
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
				<section className="tableContent" ref={refTableContent}>
					{isLoading && <Spinner />}
					<table className="fileTable">
						<tbody>
							{files.map((file) => (
								<tr className="file" key={file.id}>
									<td className="file__thumbnail">
										{file['.tag'] === 'folder' ? (
											<FolderIcon
												style={{ fontSize: 45 }}
											/>
										) : file.thumbnail ? (
											<img
												src={`data:image/png;base64, ${file.thumbnail}`}
												alt=""
											/>
										) : (
											<InsertDriveFileIcon
												style={{ fontSize: 45 }}
											/>
										)}
									</td>
									<td className="file__name">
										<span>
											{file['.tag'] === 'folder' ? (
												<Link to={file.path_lower}>
													{' '}
													{file.name}
												</Link>
											) : (
												<a
													href={file.link}
													download={file.name}
												>
													{file.name}
												</a>
											)}
										</span>
									</td>
									<td className="file__modified">
										<span>
											<Moment format="YYYY/MM/DD">
												{file.server_modified}
											</Moment>
										</span>
									</td>
									<td className="file__size">
										<span>{file.size}</span>
									</td>
									<td
										className="file__starred"
										onClick={() => toggleStar(file)}
									>
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
													getButtonPosition(
														e,
														file.id
													)}
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
					<div className="spacer" />
				</section>
			</main>
		</React.Fragment>
	);
}
