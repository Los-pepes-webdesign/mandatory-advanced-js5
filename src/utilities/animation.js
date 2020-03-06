import gsap from 'gsap';

export const initFolderPopup = (node) => {
	gsap.from(node, {
		duration: 0.5,
		opacity: 0,
		y: 100
	});
};

export const hotMexicanGuysPopup = (node) => {
	gsap.to(node, {
		duration: 0.5,
		opacity: 1
	});
};
