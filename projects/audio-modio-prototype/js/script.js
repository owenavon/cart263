// Audio Modio
// Owen Avon

// Prototype that displays the potential of modifying a users voice with the api tuna.

"use strict";

  const downloadLink = document.getElementById('download');
  const player = document.getElementById('player');
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');

  $("#player").hide(); // Hides the player id by default.
  $("#download").hide(); // Hides the download id by default.
  $("#stop").hide(); // Hides the stop button by default.


  const handleSuccess = function(stream) {
    const options = {
      mimeType: 'audio/webm'
    };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    // DATAAVAILABLE METHOD
    mediaRecorder.addEventListener('dataavailable', function(e) { // dataavailable fires when mediaRecorder delivers media.
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    // EVENT lISTENER UPON STOP BUTTON
    mediaRecorder.addEventListener('stop', function() { // Defines actions that happen upon cliking on the stop button
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks)); // Gnerates audio doownload link.
      downloadLink.download = 'testRecording.wav'; // Name the recording to testRecording.wav.

      $("#download").show(); // Shows the download button once the recording has stopped.

      player.src = URL.createObjectURL(new Blob(recordedChunks)); // Assigns an src to player
      $("#player").show(); // Displays the player interface upon stopping the event litener.

      $("#stop").hide(); // Hides the player interface upon stopping the event litener.
      $("#start").hide(); // Hides the player interface upon stopping the event litener.


    });

    // STOP RECORIDNG
    stopButton.addEventListener('click', function() { // Event listener that listens for button click.
      mediaRecorder.stop(); // Stops audio input recording upon event listener button.
    });

    // START RECORDING
    startButton.addEventListener('click', function() { // Event listener that listens for button click.
      mediaRecorder.start(); // Starts audio input recording upon event listener button.

      $("#stop").show(); // Shows the stop button once the user has started the recording.
      $("#start").hide(); // Hides the start button once the user has started the recording.
    });
  };

  // GET USER MEDIA VIA AUDIO INPUT
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  }).then(handleSuccess);
