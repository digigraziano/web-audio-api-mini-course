(function () {
	'use strict';

	const PIANO_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/web-audio-series/files/piano.mp3';
	const IR_URL = 'https://raw.githubusercontent.com/learnable-content/jamesseanwright/master/web-audio-series/files/ir.mp3';

	const context = new AudioContext();
	
	const bufferPromise = Promise.all([
		downloadAsAudioBuffer(PIANO_URL),
		downloadAsAudioBuffer(IR_URL)
	]);

	bufferPromise.then(play);

	function downloadAsAudioBuffer(url) {
		return window.fetch(url)
				.then(response => response.arrayBuffer())
				.then(arrayBuffer => context.decodeAudioData(arrayBuffer));
	}

	function play(audioBuffers) {
		const [ pianoBuffer, irBuffer ] = audioBuffers;
		const pianoNode = context.createBufferSource();

		pianoNode.buffer = pianoBuffer;

		connectNodes(pianoNode);

		pianoNode.start();
	}

	function connectNodes(firstNode, secondNode = context.destination) {
		firstNode.connect(secondNode);
	}
}());