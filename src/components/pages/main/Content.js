import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useObservable, state$ } from '../../../utilities/store';

export default function Content() {
	const { files } = useObservable(state$);

	return (
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
					{files.map((file) => (
						<tr key={file.id}>
							<td>{file.name}</td>
							<td>{file.server_modified}</td>
							<td>
								<MoreVertIcon />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
