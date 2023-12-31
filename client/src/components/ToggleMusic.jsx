import React, { Component } from "react";

// Import your audio file
import song from "../assets/music/Magic Forest.mp3";

class ToggleMusic extends Component {
// Create state
state = {

	// Get audio file in a variable
	audio: new Audio(song),

	// Set initial state of song
	isPlaying: false,
};

// Main function to handle both play and pause operations
playPause = () => {

	// Get state of song
	let isPlaying = this.state.isPlaying;

	if (isPlaying) {
	// Pause the song if it is playing
	this.state.audio.pause();
	} else {

	// Play the song if it is paused
	this.state.audio.play();
	}

	// Change the state of song
	this.setState({ isPlaying: !isPlaying });
};

render() {
	return (
	<div>

		{/* Button to call our main function */}
		<button onClick={this.playPause}>
		{this.state.isPlaying ?
			"Music ON" :
			"Music OFF"}
		</button>
	</div>
	);
}
}

export default ToggleMusic;
