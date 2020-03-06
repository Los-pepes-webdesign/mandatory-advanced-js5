import React, { useState, useRef } from 'react';
import { hotMexicanGuysPopup } from '../../../utilities/animation';

export default function ProgressBarPopup(props) {
	const [ finished, updateFinished ] = useState(false);
	const hotMexicanGuysRef = useRef(null);
	let progress = props.uploadProgress;

	let progressStyle = {
		width: progress + '%'
	};

	if (progress === 100 && !finished) {
		updateFinished(true);
		hotMexicanGuysPopup(hotMexicanGuysRef.current);
	}

	function onClick() {
		props.uploadPopup(false);
	}

	return (
		<React.Fragment>
			<div className="hotMexicanGuys" ref={hotMexicanGuysRef} />
			<div className="progressBarPopup">
				<p className="progressBarPopup__text">
					Uploading {props.fileUploading.name}
				</p>
				<div className="progressBarPopup__graphicsContainer">
					<div
						className="progressBarPopup__graphicsContainer__progress"
						style={progressStyle}
					/>
				</div>
				{finished ? (
					<div className="progressBarPopup__finished">
						<p className="progressbarPopup__finished__text">
							Upload Complete
						</p>
						<button
							className="progressBarPopup__finished__button"
							onClick={onClick}
						>
							Arriba!
						</button>
					</div>
				) : (
					<div className="progressBarPopup__dummy" />
				)}
			</div>
		</React.Fragment>
	);
}
