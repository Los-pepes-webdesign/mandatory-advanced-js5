import React, { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
	useObservable,
	state$
} from '../../../utilities/store';
import FileMore from "./FileMore";

export default function Content() {
	const { files } = useObservable(state$);
	const [ showMore, updateShowMore ] = useState(false);
	const [ buttonPos, updateButtonPos ] = useState({x: "0px", y: "0px"});

	function getButtonPosition(e){
		updateShowMore(!showMore);
		const buttonPosX = e.target.getBoundingClientRect().x;
		const buttonPosY = e.target.getBoundingClientRect().y;
		updateButtonPos({x: buttonPosX, y: buttonPosY});
	}

	return (
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
					{files.map((file) => (
						<tr key={file.id}>
							<td>{file.name}</td>
							<td>{file.server_modified}</td>
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
									<button className="fileMoreButton" onClick={getButtonPosition}>
										<MoreVertIcon />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showMore && <FileMore buttonPosition={buttonPos} />}
		</main>
	);
}
