(function () {
    'use strict';

    const SHARP_MODIFIER = 'keyboard__key--sharp';
    const DEFAULT_OCTAVE = 4;

    const notes = new Map([
		['C', 16.35],
		['C#', 17.32],
		['D', 18.35],
		['D#', 19.45],
		['E', 20.60],
		['F', 21.83],
		['F#', 23.12],
		['G', 24.50],
		['G#', 25.96],
		['A', 27.50],
		['A#', 29.14],
		['B', 30.87]
	]);

    const keyBindings = new Map([
        ['a', 'C'],
		['w', 'C#'],
		['d', 'D'],
		['r', 'D#'],
		['f', 'E'],
		['g', 'F'],
		['y', 'F#'],
		['h', 'G'],
		['u', 'G#'],
		['k', 'A'],
		['o', 'A#'],
		['l', 'B']
    ]);

    class Keyboard {
        constructor(targetElement, keyTemplate) {
            this.context = new AudioContext();
            this.targetElement = targetElement;
            this.keyTemplate = keyTemplate.content.firstElementChild;
            this.octave = DEFAULT_OCTAVE;
            this.oscillatorNode = null;
        }

        render() {
            for (let [note, frequency] of notes) {
                const key = this.keyTemplate.cloneNode(true);

                key.textContent = note;
                key.classList.add(note.includes('#') ? SHARP_MODIFIER : null);
                key.dataset.frequency = frequency;

                this.targetElement.appendChild(key);
            }
        }

        registerEventHandlers() {
            const { targetElement } = this;

            targetElement.onmousedown = this.createClickHandler();
            targetElement.onmouseup = () => this.stop();
            targetElement.onkeydown = this.createKeyHandler();
            targetElement.onkeyup = () => this.stop();
        }

        createClickHandler() {
            return event => {
                const { frequency } = event.target.dataset;
                this.play(frequency);
            };
        }

        createKeyHandler() {
            return event => {
                const { key } = event;

                if (!keyBindings.has(key)) {
                    return;
                }

                const note = keyBindings.get(key);
                const frequency = notes.get(note);

                this.play(frequency);
            };
        }

        play(frequency) {
            const oscillatorNode = this.context.createOscillator();

            oscillatorNode.frequency.value = frequency * this.octave;
            oscillatorNode.type = 'square';
            oscillatorNode.connect(this.context.destination);
            oscillatorNode.start();

            this.oscillatorNode = oscillatorNode;
        }

        stop() {
            this.oscillatorNode.stop();
        }

        focus() {
            this.targetElement.focus();
        }
    }

    window.APP.Keyboard = Keyboard;
}());