(function () {
	'use strict';

	const { Keyboard, Drums } = window.APP;
	const context = new AudioContext();

	const keyboard = new Keyboard(
		context,
		document.body.querySelector('.keyboard'),
		document.body.querySelector('#key-template')
	);

	const drums = new Drums(
		context,
		document.body.querySelector('.drums'),
		document.body.querySelector('#drum-loop-template')
	);
}());