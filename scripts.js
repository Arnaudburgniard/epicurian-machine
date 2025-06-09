document.addEventListener('DOMContentLoaded', () => {
	console.log("Epicurian Machine initialized 🚀");

	const body = document.querySelector("body");
	const main = document.createElement("main");
	const tutorial = document.createElement("p");
	const buttonContainer = document.createElement("div");
	let layerActivated = 0;
	const layers = [];
	const buttons = [];

	tutorial.id = "home";
	tutorial.textContent = "Kick off the Epicurian Machine by pressing any key on your keyboard, then combine it with other keys to create your own recipe!"
	main.appendChild(tutorial);
	body.appendChild(main);

	buttonContainer.id = 'buttonContainer';
	main.appendChild(buttonContainer);

	const blendModes = [
    'screen',
    'lighten',
    'hard-light',
    'difference',
    'exclusion',
    'luminosity'
  ];

	const media = [
    'video1.webm',
    'video2.webm',
    'video3.webm',
    'image2.jpg',
    'image1.jpg',
    'image2.jpg',
    'image1.jpg',
    'image2.jpg',
    'image1.jpg',
    'image2.jpg'
  ];

	const sound = [
	'sound1.mp3',
    'sound2.mp3',
    'sound3.mp3',
    'sound1.mp3',
    'sound2.mp3',
    'sound3.mp3',
    'sound1.mp3',
    'sound2.mp3',
    'sound3.mp3',
    'sound1.mp3'
	]

	const keyboard = [
    'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
    'w', 'x', 'c', 'v', 'b', 'n'
  ];

	// Function to create a media element (img or video)
	const createMediaElement = (mediaPath) => {
		const fileExtension = mediaPath.substring(mediaPath.lastIndexOf('.') + 1).toLowerCase();
		if (fileExtension === 'webm') {
			const video = document.createElement("video");
			video.muted = true;
			video.loop = true;
			video.playsInline = true;
			const source = document.createElement('source');
			source.src = './video/' + mediaPath;
			source.type = 'video/webm';
			video.appendChild(source);
			return video;
		} else if (fileExtension === 'jpg') {
			const img = document.createElement("img");
			img.src = './image/' + mediaPath;
			return img;
		} else {
			console.log(`Extension "${fileExtension}" not recognized for ${mediaPath}`);
			return null;
		}
	};

	// Function to create an audio element
	const createAudio = (audioPath) => {
		const audio = document.createElement("audio");
		audio.loop = true;
		audio.autoplay = false;
		audio.preload = "auto";
		audio.type = "audio/mp3"
		audio.src = './sound/' + audioPath;
		return audio;
	};

	media.forEach((mediaPath, index) => {
		const layer = document.createElement("div");
		layer.classList.add('layer');
		layer.style.display = 'none';

		const mediaElement = createMediaElement(mediaPath);
		if (mediaElement) {
			layer.appendChild(mediaElement);
		}

		// Use the corresponding audio path from audioSources
		const audioElement = createAudio(sound[index]);
		if (audioElement) {
			layer.appendChild(audioElement);
		}

		main.appendChild(layer);
		layers.push(layer);

		const button = document.createElement("button");
		button.textContent = index + 1;
		button.addEventListener('click', () => toggleLayer(index));
		buttonContainer.appendChild(button);
		buttons.push(button);
	});

	function toggleLayer(index) {
		if (index >= 0 && index < layers.length) {
			const layer = layers[index];
			const button = buttons[index];
			const mediaElement = layer.querySelector('video, img');
			const audioElement = layer.querySelector('audio');
			const isVisible = layer.style.display === 'block';

			layer.style.display = isVisible ? 'none' : 'block';
			layer.style.mixBlendMode = isVisible ? '' : getRandomElement(blendModes);
			button.classList.toggle('active', !isVisible);

			if (mediaElement) {
				if (mediaElement.tagName === 'VIDEO') {
					isVisible ? mediaElement.pause() : mediaElement.play();
				}
			}

			if (audioElement) {
				if (audioElement.tagName === 'AUDIO') {
					isVisible ? audioElement.pause() : audioElement.play();
				}
			}

			layerActivated += isVisible ? -1 : 1;
			tutorial.style.display = layerActivated === 0 ? 'block' : 'none';

			if (!isVisible) {
				console.log(`Layer ${index + 1}: ${layer.style.mixBlendMode}`);
			}
		}
	}

	addEventListener('keydown', (event) => {
		if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
			return;
		}
		const index = keyboard.indexOf(event.key.toLowerCase());
		if (index !== -1) {
			toggleLayer(index);
		}
	});

	function getRandomElement(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
});
