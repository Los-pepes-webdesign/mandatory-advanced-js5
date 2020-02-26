import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
	state$,
	useObservable
} from '../../../utilities/store';

export default function QueriedContent() {
	const { queriedFiles } = useObservable(state$);
	return (
		<React.Fragment>
			<main className="content">
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
							<tr key={file.id}>
								<td>{file.name}</td>
								<td>
									{file.server_modified}
								</td>
								<td>
									<div>
										<ul>
											<li>
												<a
													href={
														file.href
													}
													download={
														file.name
													}
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
		</React.Fragment>
	);
}
