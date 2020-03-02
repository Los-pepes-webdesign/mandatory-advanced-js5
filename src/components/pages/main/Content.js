import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useObservable, state$ } from '../../../utilities/store';
import FileMore from './FileMore';
import DeletionModal from './Content.DeletionModal';

export default function Content() {
	const [ localState, setLocalState ] = useState({
		path: '',
		modal: false,
		loading: true
	});
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
				<DeletionModal
					path={localState.path}
					closeModal={() => setLocalState({ path: '', modal: false })}
				/>
			)}
			<main className="content">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Modified</th>
							<th>Size</th>
							<th />
						</tr>
					</thead>
				</table>
				<table>
					<tbody>
						{files.map((file) => (
							<tr key={file.id}>
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
								<td>{file.size}</td>
								<td>
									<div>
										<button
											className="fileMoreButton"
											onClick={getButtonPosition}
										>
											<MoreVertIcon />
										</button>
										<ul>
											<li>
												<a
													href={file.link}
													download={file.name}
												>
													Download
												</a>
											</li>
											<li>
												<button
													type="button"
													onClick={() =>
														setLocalState({
															path:
																file.path_lower,
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
