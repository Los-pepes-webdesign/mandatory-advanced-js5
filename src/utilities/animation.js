import gsap from 'gsap';

export const initFolderPopup = (node) => {
	gsap.from(node, {
		duration: 1,
		opacity: 0
	});
};
