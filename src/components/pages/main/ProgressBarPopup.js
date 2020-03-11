import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { hotMexicanGuysPopup } from '../../../utilities/animation';

export default function ProgressBarPopup(props) {
	const [ finished, updateFinished ] = useState(false);
	const [ mexicanSong, setMexicanSong ] = useState(false);
	const hotMexicanGuysRef = useRef(null);
	let progress = props.uploadProgress;

	let progressStyle = {
		width: progress + '%'
	};

	if (progress === 100 && !finished) {
		updateFinished(true);
		setMexicanSong(true);
		hotMexicanGuysPopup(hotMexicanGuysRef.current);
	}

	function onClick() {
		setMexicanSong(false);
		updateFinished(false);
		props.updateProgress(0);
		props.uploadPopup(false);
	}

	return ReactDOM.createPortal(
		<React.Fragment>
			<div
				className="hotMexicanGuys"
				ref={hotMexicanGuysRef}
				style={{
					backgroundImage: `url(${process.env
						.PUBLIC_URL}/assets/hotMexicanGuys.png)`
				}}
			/>

			{mexicanSong && (
				<audio
					controls
					style={{ display: 'none ' }}
					src="mexico.mp3"
					type="audio/mpeg"
					autoPlay
				/>
			)}

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
		</React.Fragment>,
		document.querySelector('body')
	);
}
