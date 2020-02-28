import React, { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useObservable, state$ } from '../../../utilities/store';

import DeletionModal from './Content.DeletionModal';

export default function Content() {
	const [ localState, setLocalState ] = useState({ path: '', modal: false, loading: true });
	const { files } = useObservable(state$);

	console.log(files);

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
						</tr>
					</thead>
				</table>
				<table>
					<tbody>
						{files.map((file) => (
							<tr key={file.id}>
								<td>{file.name}</td>
								<td>{file.client_modified}</td>
								<td>{file.size}</td>
								<td>
									<div>
										<MoreVertIcon />
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
			</main>
		</React.Fragment>
	);
}
